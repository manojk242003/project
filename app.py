import os

# ================== macOS + FAISS + Torch SAFETY ==================
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["MKL_NUM_THREADS"] = "1"
os.environ["OPENBLAS_NUM_THREADS"] = "1"
os.environ["VECLIB_MAXIMUM_THREADS"] = "1"
os.environ["NUMEXPR_NUM_THREADS"] = "1"

from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import faiss
import numpy as np
import torch
from sentence_transformers import SentenceTransformer
from huggingface_hub import InferenceClient
from typing import List

# ================== THREAD SAFETY ==================
faiss.omp_set_num_threads(1)
torch.set_num_threads(1)
torch.set_num_interop_threads(1)

# ================== APP (CREATE ONCE) ==================
app = Flask(__name__)
CORS(app)  # ✅ CORS ENABLED CORRECTLY

MODEL_CACHE = {}

# ================== PATHS ==================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TXT_FILE = os.path.join(BASE_DIR, "new_final_voyage_summaries_fast_hybrid_numbered.txt")
INDEX_DIR = os.path.join(BASE_DIR, "faiss_indexes")

# ================== CONFIG ==================
EMBED_MODEL = "all-MiniLM-L6-v2"
HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.2"
HF_API_KEY = os.getenv("HF_API_KEY")  # optional

TOP_K = 7
device = "cpu"  # FORCE CPU on macOS

# ================== UTILITIES ==================
def get_model():
    if "embed" not in MODEL_CACHE:
        MODEL_CACHE["embed"] = SentenceTransformer(EMBED_MODEL, device=device)
    return MODEL_CACHE["embed"]

def normalize(v):
    return v / np.clip(np.linalg.norm(v, axis=1, keepdims=True), 1e-9, None)

def extract_speed(text):
    m = re.search(r"average speed of ([\d.]+)", text)
    return float(m.group(1)) if m else None

def load_summaries():
    if not os.path.exists(TXT_FILE):
        raise FileNotFoundError(f"Missing file: {TXT_FILE}")
    return [l.strip() for l in open(TXT_FILE) if l.strip()]

# ================== INDEX BUILD ==================
def build_indexes(summaries: List[str]):
    os.makedirs(INDEX_DIR, exist_ok=True)
    model = get_model()

    texts = [s for s in summaries if extract_speed(s) is not None]
    if not texts:
        raise ValueError("No valid summaries with speed info")

    emb = normalize(model.encode(texts, convert_to_numpy=True).astype("float32"))

    index = faiss.IndexFlatL2(emb.shape[1])
    index.add(emb)

    faiss.write_index(index, os.path.join(INDEX_DIR, "global.faiss"))
    np.save(os.path.join(INDEX_DIR, "global_embeddings.npy"), emb)
    open(os.path.join(INDEX_DIR, "global.txt"), "w").write("\n".join(texts))

# ================== RETRIEVAL ==================
def retrieve_context(query):
    index_path = os.path.join(INDEX_DIR, "global.faiss")
    txt_path = os.path.join(INDEX_DIR, "global.txt")

    if not os.path.exists(index_path):
        return "⚠ FAISS index not built. Call /build-index first."

    model = get_model()
    q_emb = normalize(model.encode([query], convert_to_numpy=True).astype("float32"))[0]

    index = faiss.read_index(index_path)
    texts = open(txt_path).read().splitlines()

    _, I = index.search(q_emb.reshape(1, -1), min(TOP_K, len(texts)))
    return "\n---\n".join(texts[i] for i in I[0])

# ================== GENERATION (SAFE) ==================
def generate_response(query, context):
    if not HF_API_KEY:
        return {
            "status": "error",
            "message": (
                "Hugging Face API key not configured.\n"
                "Run:\n"
                "export HF_API_KEY=hf_xxx\n"
                "OR\n"
                "hf auth login"
            )
        }

    try:
        client = InferenceClient(api_key=HF_API_KEY)
        resp = client.chat.completions.create(
            model=HF_MODEL,
            messages=[
                {"role": "system", "content": "You are an experienced maritime voyage analyst."},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion:\n{query}"}
            ],
            temperature=0.35,
            max_tokens=400
        )
        return {"status": "success", "answer": resp.choices[0].message.content}

    except Exception as e:
        return {"status": "error", "message": str(e)}

# ================== ROUTES ==================
@app.route("/build-index", methods=["POST"])
def build_index_api():
    try:
        build_indexes(load_summaries())
        return jsonify({"status": "success", "message": "FAISS index built"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/query", methods=["POST"])
def query_api():
    data = request.get_json(force=True)
    query = data.get("query", "")

    if not query:
        return jsonify({"status": "error", "message": "Query is required"}), 400

    context = retrieve_context(query)
    response = generate_response(query, context)

    return jsonify({
        "query": query,
        "context": context,
        **response
    })

# ================== MAIN ==================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)
