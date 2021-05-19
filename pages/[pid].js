import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Wikipage.module.css";
import style from "../styles/Home.module.css";
import Search from "../components/Search";

export default function Post() {
  const router = useRouter();
  const [pageData, setPageData] = useState("");
  const [imgSource, setImageSource] = useState("");
  const { pid } = router.query;
  const [isPageNotFound, setIsPageNotFound] = useState(false);
  const [classes, setClasses] = useState(`${styles.displayNone}`);

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
      })
      .then(() => {
        setPageData((state) => {
          if (state.slice(0, 4) === "<!--") {
            setIsPageNotFound(true)
          } else {
            setClasses(`${styles.container}`);
            return state
          };
        })
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
        <link rel="icon" href="/PW.ico" />
        <meta
          name="Description"
          content="Read Wikipedia articles styled attractively"
        ></meta>
      </Head>
      <main className={classes}>
        <h1>{pid}</h1>
        <div className={styles.imgWrapper}>
          <img src={imgSource} alt="Photo from unsplash"></img>
        </div>
        <div dangerouslySetInnerHTML={wikiHTML()}></div>
      </main>
      <div
        className={
          isPageNotFound === true ? styles.pageNotFound : styles.displayNone
        }
      >
        <div className={style.main}>
          <p>
            We're sorry, but the page{" "}
            <span className={styles.italic}>{pid}</span> does not exist.
          </p>
          <p>Try another search</p>
          <img
            className={style.logo}
            src="/logo.svg"
            alt="PrettyWiki logo"
          ></img>
          <Search />
        </div>
      </div>
    </>
  );
}
