import { useState } from "react";
import { motion } from "framer-motion";
import { RideData } from "@/lib/DataProcessor";
import { rideDescriptions, AppConfig } from "@/config/AppConfig";
import { StatusBadge } from "./StatusBadge";
import { MiniChart } from "./MiniChart";
import { DetailedChart } from "./DetailedChart";

interface RideTileProps {
  ride: RideData;
}

export function RideTile({ ride }: RideTileProps) {
  const [flipped, setFlipped] = useState(false);
  const description = rideDescriptions[ride.name] || null;
  const canFlip = ride.available;

  const handleFlip = () => {
    if (!canFlip) return;
    setFlipped((f) => !f);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={canFlip ? { scale: AppConfig.animation.hoverScale } : {}}
      className="flip-container w-full"
      style={{ minHeight: 220 }}
    >
      <div
        className={`flip-inner relative w-full ${flipped ? "flipped" : ""}`}
        onClick={handleFlip}
        style={{
          cursor: canFlip ? "pointer" : "default",
          minHeight: 220,
        }}
      >
        {/* FRONT */}
        <div
          className={`flip-front absolute inset-0 park-card p-4 flex flex-col ${
            !ride.available ? "park-card-unavailable" : ""
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-extrabold text-sm text-foreground leading-tight pr-2">
              {ride.name}
            </h3>
            <StatusBadge available={ride.available} />
          </div>

          {ride.available ? (
            <div className="flex-1 flex items-end">
              <MiniChart
                data={ride.hourlyData}
                currentHourIndex={ride.currentHourIndex}
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground text-xs font-semibold">
                Unavailable currently
              </p>
            </div>
          )}

          {description && ride.available && (
            <p className="text-[10px] text-muted-foreground mt-2 truncate" title={description}>
              {description}
            </p>
          )}
        </div>

        {/* BACK */}
        {canFlip && (
          <div className="flip-back absolute inset-0 park-card p-4 flex flex-col">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-extrabold text-sm text-foreground leading-tight pr-2">
                {ride.name}
              </h3>
              <StatusBadge available={ride.available} />
            </div>

            {description && (
              <p className="text-xs text-muted-foreground mb-2">
                {description}
              </p>
            )}

            <div className="flex-1 flex items-end">
              <DetailedChart
                data={ride.hourlyData}
                currentHourIndex={ride.currentHourIndex}
              />
            </div>

            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Tap to flip back
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
