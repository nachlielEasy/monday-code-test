import { EnvironmentVariablesManager } from "@mondaycom/apps-sdk";
import { GetServerSideProps, NextPage } from "next";

import Head from "next/head";
import Link from "next/link";

interface ServerSidePageProps {
  currentTime: string;
  environment: string;
  envVariable: string;
}

const ServerSidePage: NextPage<ServerSidePageProps> = ({
  currentTime,
  environment,
  envVariable,
}) => {
  return (
    <>
      <Head>
        <title>Server Side Page</title>
      </Head>
      <div style={{ padding: "24px", maxWidth: "1024px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "24px",
          }}
        >
          Server-Side Rendered Page
        </h1>

        {/* Server Info */}
        <div
          style={{
            marginBottom: "32px",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9fafb",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            Server Information
          </h2>
          <p style={{ marginBottom: "8px" }}>
            This page was rendered at: {currentTime}
          </p>
          <p style={{ marginBottom: "8px" }}>
            Current environment: {environment}
          </p>
          <p>Environment variable: {envVariable}</p>
        </div>

        {/* Navigation */}
        <div
          style={{
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
            Navigation
          </h2>
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
            → Go back to home
          </Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  ServerSidePageProps
> = async () => {
  // Initialize the environment variables manager
  const envManager = new EnvironmentVariablesManager({
    updateProcessEnv: true,
  });

  // Get the latest version of environment variable
  const envVariable = await envManager.get("NEXT_PUBLIC_TEST_ENV");

  return {
    props: {
      currentTime: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      envVariable: String(envVariable || "Not found"),
    },
  };
};

export default ServerSidePage;
