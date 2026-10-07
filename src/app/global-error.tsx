"use client";

// Replaces the root layout when the layout itself fails, so globals.css and the fonts
// aren't guaranteed. Everything this page needs is inline.
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          textAlign: "center",
          background: "#020302",
          color: "#e9f1e9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <title>Something went wrong | TillTechnologies.ai</title>
        <h1 style={{ color: "#42ba40", fontFamily: "ui-monospace, monospace", fontSize: "2.25rem", margin: 0 }}>
          Oops
        </h1>
        <p style={{ margin: 0, opacity: 0.7 }}>The site hit an error while loading. Trying again usually fixes it.</p>
        <button
          type="button"
          onClick={() => retry()}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            border: 0,
            borderRadius: "8px",
            background: "#42ba40",
            color: "#020302",
            font: "inherit",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
