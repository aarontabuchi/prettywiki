import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Wikipage.module.css";

export default function Post() {
  const router = useRouter();
  const [pageData, setPageData] = useState("");
  const [imgSource, setImageSource] = useState("");
  const { pid } = router.query;

  useEffect(() => {
    // pid works, except when you refresh the page it returns undefined in the useEffect
    const pathName = window.location.pathname.slice(1);
    const unsplashURL = "https://source.unsplash.com/720x480/?" + pathName;
    setImageSource(unsplashURL);
    const fetchURL =
      "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=" +
      pathName;
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        const pageID = Object.keys(data.query.pages)[0];
        setPageData(data.query.pages[pageID].extract);
      });
  }, []);

  // must use a function with this return object to use dangerouslySetInnerHTML
  function wikiHTML() {
    return { __html: pageData };
  }

  return (
    <>
      <Head>
        <title>{pid}</title>
      </Head>
      <body className={styles.main}>
        <header></header>
        <main className={styles.container}>
          <h1>{pid}</h1>
          <div className={styles.imgWrapper}>
            <img src={imgSource}></img>
          </div>
          <div dangerouslySetInnerHTML={wikiHTML()}></div>
        </main>
      </body>
    </>
  );
}
