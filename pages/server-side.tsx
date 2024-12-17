import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

interface ServerSidePageProps {
  currentTime: string;
  environment: string;
}

const ServerSidePage: NextPage<ServerSidePageProps> = ({
  currentTime,
  environment,
}) => {
  return (
    <>
      <Head>
        <title>Server Side Page</title>
      </Head>
      <div>
        <h1>Server-Side Rendered Page</h1>
        <p>This page was rendered at: {currentTime}</p>
        <p>Current environment: {environment}</p>
        <p>
          <Link href="/">Go back to home</Link>
        </p>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  ServerSidePageProps
> = async () => {
  return {
    props: {
      currentTime: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    },
  };
};

export default ServerSidePage;
