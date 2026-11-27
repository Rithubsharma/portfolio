import { ImageResponse } from "next/og";

// Rendered once at build time and served as /brand/og.png, so it has a real
// file extension on static hosts.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

const COLS = 30;
const ROWS = 5;

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#08262a",
          color: "#eceeea",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "128px", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-4px" }}>
            Systems that
          </div>
          <div style={{ fontSize: "128px", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-4px", color: "#f4a51c" }}>
            stay in step.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {Array.from({ length: ROWS }, (_, r) => (
            <div key={r} style={{ display: "flex", justifyContent: "space-between" }}>
              {Array.from({ length: COLS }, (_, c) => (
                <div
                  key={c}
                  style={{ width: "10px", height: "10px", borderRadius: "5px", background: "#eceeea" }}
                />
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "30px" }}>
          <span style={{ fontWeight: 700 }}>Rishav Sharma</span>
          <span style={{ color: "#b3c4c2" }}>Backend engineer at GoDaddy, Bangalore</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
