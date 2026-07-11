import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent gradient blob */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1,
            display: "flex",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Rishav
          </span>
          <span style={{ color: "#fafafa", marginLeft: "16px" }}>Sharma</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            marginTop: "20px",
            fontWeight: 400,
          }}
        >
          Software Development Engineer
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "40px",
          }}
        >
          {["Distributed Systems", "Backend Infrastructure", "AI Platforms"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #27272a",
                  background: "#18181b",
                  color: "#d4d4d8",
                  fontSize: "16px",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* Company strip */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "40px",
            color: "#71717a",
            fontSize: "16px",
          }}
        >
          <span>GoDaddy</span>
          <span>·</span>
          <span>DP World</span>
          <span>·</span>
          <span>IIT Roorkee</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
