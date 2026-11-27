import { ImageResponse } from "next/og";

// Rendered once at build time and served as /brand/icon.png, so it has a real
// file extension on static hosts.
export const dynamic = "force-static";

const size = { width: 32, height: 32 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08262a",
          fontFamily: "system-ui, sans-serif",
          fontSize: "20px",
          fontWeight: 800,
          color: "#f4a51c",
        }}
      >
        R
      </div>
    ),
    { ...size }
  );
}
