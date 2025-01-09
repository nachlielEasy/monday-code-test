import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

interface DemoPageProps {
  // Add props if needed
}

const DemoPage: NextPage<DemoPageProps> = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Head>
        <title>Monday App Demo</title>
      </Head>
      <div style={{ padding: "24px", maxWidth: "1024px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "24px",
          }}
        >
          Monday App Demo Page
        </h1>

        {/* Interactive Counter */}
        <div
          style={{
            marginBottom: "32px",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            Interactive Counter
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => setCount((prev) => prev - 1)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <span style={{ fontSize: "1.25rem" }}>{count}</span>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div
          style={{
            marginBottom: "32px",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            Navigation
          </h2>
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link
              href="/server-side"
              style={{ color: "#3b82f6", textDecoration: "none" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              → Server-side Example
            </Link>
            <Link
              href="/"
              style={{ color: "#3b82f6", textDecoration: "none" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              → Back to Home
            </Link>
          </nav>
        </div>

        {/* Environment Info */}
        <div
          style={{
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9fafb",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            Environment Info
          </h2>
          <p>Runtime: {process.env.NODE_ENV}</p>
          <p>
            Next Public Variable:{" "}
            {process.env.NEXT_PUBLIC_TEST_ENV || "Not set"}
          </p>
        </div>
      </div>
    </>
  );
};

export default DemoPage;
