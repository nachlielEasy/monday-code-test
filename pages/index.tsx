import Link from "next/link";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js TypeScript Demo</title>
      </Head>
      <main>
        <h1>Welcome to Next.js! V7</h1>
        <nav>
          <ul className={styles.buttonList}>
            <li>
              <Link href="/test-route" className={styles.button}>
                Test Route Page
              </Link>
            </li>
            <li>
              <Link href="/server-side" className={styles.button}>
                Server Side Page
              </Link>
            </li>
            <li>
              <Link href="/api/hello" className={styles.button}>
                API Endpoint (opens in new tab)
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}
