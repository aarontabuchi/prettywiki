import Head from "next/head";
import styles from "../styles/Home.module.css";
import Search from "../components/Search.js";

export default function Home() {
  return (
    <>
      <Head>
        <title>PrettyWiki - The Pretty Wikipedia</title>
        <link rel="icon" href="/PW.ico" />
      </Head>
      <body className={styles.body}>
        <main>
          <div className={styles.main}>
            <img className={styles.logo} src="/logo.svg"></img>
            <Search />
          </div>
        </main>
      </body>
    </>
  );
}
