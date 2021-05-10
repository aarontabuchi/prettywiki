import Head from "next/head";
import styles from "../styles/Home.module.css";
import Search from "../components/Search.js";

export default function Home() {
  return (
    <>
      <Head>
        <title>PrettyWiki - The Pretty Wikipedia</title>
        <link rel="icon" href="/PW.ico" />
        <meta name="Description" content="Read Wikipedia articles styled attractively"></meta>
      </Head>
      <main>
        <div className={styles.main}>
          <img className={styles.logo} src="/logo.svg" alt="PrettyWiki logo"></img>
          <Search />
        </div>
      </main>
    </>
  );
}
