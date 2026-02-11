import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/park/Header";
import { FileUploader } from "@/components/park/FileUploader";
import { RideTile } from "@/components/park/RideTile";
import { processCSVData, parseGzippedCSV, parseCSVText, RawRow, RideData } from "@/lib/DataProcessor";

const Index = () => {
  const [rides, setRides] = useState<RideData[]>([]);
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDataLoaded = useCallback((rows: RawRow[]) => {
    const processed = processCSVData(rows);
    setRides(processed);
    setHasData(true);
  }, []);

  // Load bundled sample data on mount
  useEffect(() => {
    async function loadSample() {
      try {
        const response = await fetch("/sample-data.csv.gz");
        if (!response.ok) throw new Error("No sample data");
        // Server may auto-decompress gzip, try text first
        const text = await response.text();
        let rows: RawRow[];
        try {
          rows = await parseCSVText(text);
        } catch {
          // Fallback: try as gzip binary
          const resp2 = await fetch("/sample-data.csv.gz");
          const buffer = await resp2.arrayBuffer();
          rows = await parseGzippedCSV(buffer);
        }
        handleDataLoaded(rows);
      } catch {
        // No sample data, user must upload
      } finally {
        setLoading(false);
      }
    }
    loadSample();
  }, [handleDataLoaded]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FileUploader onDataLoaded={handleDataLoaded} hasData={hasData} />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-3 border-park-accent border-t-transparent rounded-full" />
        </div>
      ) : rides.length > 0 ? (
        <main className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rides.map((ride) => (
              <RideTile key={ride.name} ride={ride} />
            ))}
          </div>
        </main>
      ) : (
        !hasData && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="font-bold text-lg">No ride data loaded</p>
            <p className="text-sm">Upload a CSV file to get started</p>
          </div>
        )
      )}
    </div>
  );
};

export default Index;
