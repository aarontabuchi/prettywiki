import Head from "next/head";
import styles from "../styles/Home.module.css";
import Search from "../components/Search.js";

export default function Home() {
  return (
    <>
      <Head>
        <title>PrettyWiki - The Pretty Wikipedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <body className={styles.container}>
          <div className={styles.centered}>
            <h1>PrettyWiki</h1>
            <Search />
          </div>
        </body>
      </main>
    </>
  );
}
