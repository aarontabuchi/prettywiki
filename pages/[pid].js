import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Wikipage.module.css";

export default function Post() {
  const router = useRouter();
  const { pid } = router.query;
  const [pageData, setPageData] = useState("");

  const fetchURL =
    "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=" +
    pid;

  useEffect(() => {
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        const pageID = Object.keys(data.query.pages)[0];
        setPageData(data.query.pages[pageID].extract);
      });
  }, []);

  // https://source.unsplash.com/720x480/?nature,water
  // must use a function with this return object to use dangerouslySetInnerHTML
  function wikiHTML() {
    return { __html: pageData };
  }

  const unsplashLink = "https://source.unsplash.com/720x480/?" + pid;
  return (
    <main className={styles.container}>
      <h1>{pid}</h1>
      <img src={unsplashLink}></img>
      <div dangerouslySetInnerHTML={wikiHTML()}></div>
    </main>
  );
}
