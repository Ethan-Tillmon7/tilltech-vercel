"use client";

import { motion } from "framer-motion";
import { FaRunning, FaBiking, FaSwimmer } from "react-icons/fa";
import { format } from "date-fns";
import { useStravaActivities } from "@/hooks/useStrava";
import Loading from "@/components/common/Loading";

const activityIcons: Record<string, React.ReactNode> = {
  Run: <FaRunning />,
  Ride: <FaBiking />,
  Swim: <FaSwimmer />,
};

function formatDistance(meters: number) {
  return (meters / 1609.34).toFixed(2) + " mi";
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}

function formatPace(meters: number, seconds: number) {
  const miles = meters / 1609.34;
  const paceSeconds = seconds / miles;
  const paceMin = Math.floor(paceSeconds / 60);
  const paceSec = Math.round(paceSeconds % 60);
  return `${paceMin}:${paceSec.toString().padStart(2, "0")} /mi`;
}

export default function StravaFeed() {
  const { activities, error, isLoading } = useStravaActivities();

  if (isLoading) return <Loading />;

  if (error || !activities || !Array.isArray(activities)) {
    return (
      <div className="rounded-xl border border-secondary/30 bg-background/50 p-8 text-center">
        <p className="text-text/50">
          Unable to load Strava activities. Connect your Strava account to see
          your latest workouts here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 font-pixel text-xs text-primary sm:text-sm">
        Recent Activities
      </h2>
      <div className="space-y-4">
        {activities.slice(0, 3).map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-4 rounded-xl border border-secondary/30 bg-background/50 p-4"
          >
            <div className="text-xl text-primary">
              {activityIcons[activity.type] ?? <FaRunning />}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text">{activity.name}</h3>
              <p className="text-xs text-text/40">
                {format(new Date(activity.start_date), "MMM d, yyyy")}
              </p>
            </div>
            <div className="flex gap-6 text-sm text-text/60">
              <span>{formatDistance(activity.distance)}</span>
              <span>{formatTime(activity.moving_time)}</span>
              {activity.type === "Run" && (
                <span>{formatPace(activity.distance, activity.moving_time)}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
