export const AppConfig = {
  parkName: "PortAventura World",
  headerTitle: "Skip the Wait at PortAventura World",
  headerSubtitle: "Live waiting times",
  backButton: {
    enabled: true,
    label: "Back",
    targetUrl: "https://example.com",
    openInNewTab: false,
  },
  animation: {
    flipDuration: 0.6,
    hoverScale: 1.03,
  },
  requiredColumns: ["timestamp", "ride_name", "wait_time", "availability"] as const,
};

export const rideDescriptions: Record<string, string> = {
  "Shambhala": "Europe's tallest hypercoaster 🚀",
  "Furius Baco": "0 to 135 km/h in 3.5 seconds 💨",
  "Dragon Khan": "8 inversions of pure adrenaline 🐉",
  "Stampida": "Dueling wooden roller coaster 🤠",
  "Hurakan Condor": "100m free fall tower 😱",
  "Tutuki Splash": "Volcanic water ride 🌋",
  "Silver River Flume": "Classic log flume through the Wild West 🪵",
  "El Diablo - Tren de la Mina": "Family mine train coaster ⛏️",
  "Grand Canyon Rapids": "Wild water rapids adventure 🌊",
  "Street Mission": "Interactive dark ride with the Sesame Street gang 🎯",
};
