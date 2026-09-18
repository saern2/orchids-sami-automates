"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080808",
          color: "#F5F5F5",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <main>
          <h1 style={{ fontSize: "28px", marginBottom: "12px" }}>Something went wrong</h1>
          <p style={{ color: "#A1A1AA", marginBottom: "24px" }}>
            Please try again. If the problem persists, email samiautomates@gmail.com.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: "#8B5CF6",
              color: "#fff",
              border: 0,
              borderRadius: "9999px",
              padding: "12px 28px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
