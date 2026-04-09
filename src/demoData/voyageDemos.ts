export type WayPoint = {
    name: string;
    position: [number, number];
  };
  
  export type VoyageDemo = {
    id: string;
    text: string;
    waypoints: WayPoint[];
    zoom: number;
  };
  
  /* ================== DEMO DATA ================== */
  
  export const voyageDemos: VoyageDemo[] = [
    /* =================================================
       DEMO 1: Florida Strait → Gulf of Mexico
       ================================================= */
    {
      id: "florida-gulf",
      zoom: 5,
      text: `

  
  Based on the provided vessel characteristics (length 250m, width 50m, vessel type 89),
  the suggested voyage from the Florida Strait to the Gulf of Mexico is as follows:
  
  1. Depart from Florida Strait (25.2°N, 79.6°W)
     - Sea temperature around 21–23°C
     - Moderate wave heights near 1.2 m
  
  2. Clear the Florida Keys region
     - Maintain a northerly heading
     - Monitor coastal traffic and shallow zones
  
  3. Enter the Gulf of Mexico near East Flower Garden Bank (26.2°N, 83.8°W)
     - Average wave heights may reach 1.5 m
     - Adjust speed if winter fronts intensify
  
  Additional Safety Recommendations:
  - Maintain regular weather updates
  - Exercise caution near protected marine zones
      `,
      waypoints: [
        {
          name: "Florida Strait",
          position: [25.2, -79.6],
        },
        {
          name: "Florida Keys",
          position: [26.0, -81.5],
        },
        {
          name: "East Flower Garden Bank",
          position: [26.2, -83.8],
        },
      ],
    },
  
    /* =================================================
       DEMO 2: Los Angeles → Tokyo
       ================================================= */
    {
      id: "la-tokyo",
      zoom: 3,
      text: `

  
  Based on historical data from similar container vessels,
  the suggested route from Los Angeles to Tokyo is as follows:
  
  1. Depart Los Angeles (33.8°N, 118.3°W)
     - Initial coastal conditions with moderate traffic
  
  2. Pass through San Francisco Bay (37.8°N, 122.4°W)
     - Sea temperatures around 11–15°C
     - Wave heights between 0.8–1.4 m
  
  3. Transit North Pacific near Hokkaido (43.3°N, 145.3°E)
     - Cooler waters (~4°C)
     - Moderate swell near 1.5 m
  
  4. Arrive at Tokyo (35.7°N, 140.0°E)
     - Increased traffic density
     - Maintain communication with port authorities
  
  Additional Safety Recommendations:
  - Monitor winter storms in North Pacific
  - Maintain engine and navigation readiness
      `,
      waypoints: [
        {
          name: "Los Angeles",
          position: [33.8, -118.3],
        },
        {
          name: "San Francisco",
          position: [37.8, -122.4],
        },
        {
          name: "Near Hokkaido",
          position: [43.3, 145.3],
        },
        {
          name: "Tokyo",
          position: [35.7, 140.0],
        },
      ],
    },
  ];
  