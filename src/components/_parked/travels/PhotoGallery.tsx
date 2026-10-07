"use client";

import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import travelsData from "@/data/travels.json";
import type { Photo } from "@/types";

export default function PhotoGallery() {
  const [index, setIndex] = useState(-1);

  const photos = (travelsData.photos as Photo[]).map((p) => ({
    src: p.src,
    width: p.width,
    height: p.height,
    alt: p.alt,
  }));

  if (photos.length === 0) {
    return (
      <div className="rounded-xl border border-secondary/30 bg-background/50 p-8 text-center">
        <p className="text-text/50">
          Photo gallery coming soon — check back for travel snapshots!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 font-pixel text-xs text-primary sm:text-sm">
        Photo Gallery
      </h2>
      <PhotoAlbum
        layout="rows"
        photos={photos}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos.map((p) => ({ src: p.src }))}
      />
    </div>
  );
}
