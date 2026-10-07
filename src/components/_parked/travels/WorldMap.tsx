"use client";

import dynamic from "next/dynamic";
import Loading from "@/components/common/Loading";

const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function WorldMap() {
  return (
    <div>
      <h2 className="mb-6 font-pixel text-xs text-primary sm:text-sm">
        Places I&apos;ve Been
      </h2>
      <MapInner />
    </div>
  );
}
