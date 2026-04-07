import { ImageResponse } from "next/og";

export const alt = "jessebubble — Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#171717",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scanlines overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
            display: "flex",
          }}
        />

        {/* Terminal window */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 900,
            borderRadius: 16,
            border: "1px solid #333",
            overflow: "hidden",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 18px",
              background: "#222",
              borderBottom: "1px solid #333",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#e11d48",
                display: "flex",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#333",
                display: "flex",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#333",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#666",
                fontSize: 14,
                marginLeft: 12,
              }}
            >
              jessebubble — portfolio
            </span>
          </div>

          {/* Terminal body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "28px 28px",
              background: "#1a1a1a",
              gap: 16,
            }}
          >
            {/* Prompt line 1 */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#e11d48", fontSize: 22 }}>&gt;</span>
              <span style={{ color: "#a3a3a3", fontSize: 22 }}>whoami</span>
            </div>

            {/* Output */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                paddingLeft: 32,
              }}
            >
              <span style={{ color: "#ffffff", fontSize: 48, fontWeight: 700 }}>
                jesse
                <span style={{ color: "#e11d48" }}>bubble</span>
              </span>
              <span style={{ color: "#666", fontSize: 20, marginTop: 4 }}>
                San Antonio, TX — Software Developer
              </span>
            </div>

            {/* Prompt line 2 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 8,
              }}
            >
              <span style={{ color: "#e11d48", fontSize: 22 }}>&gt;</span>
              <span style={{ color: "#a3a3a3", fontSize: 22 }}>motto</span>
            </div>

            {/* Output */}
            <div
              style={{
                display: "flex",
                paddingLeft: 32,
              }}
            >
              <span style={{ color: "#e11d48", fontSize: 22, opacity: 0.7 }}>
                &quot;Find your people. Build your future.&quot;
              </span>
            </div>

            {/* Cursor line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 8,
              }}
            >
              <span style={{ color: "#e11d48", fontSize: 22 }}>&gt;</span>
              <div
                style={{
                  width: 12,
                  height: 24,
                  background: "#e11d48",
                  opacity: 0.8,
                  display: "flex",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
