import { useEffect, useState } from "react";

export default function WikiPage() {
  const location = useLocation();
  const [pageData, setPageData] = useState("");

  const wiki = location.pathname.slice(1);
  const fetchURL =
    "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&titles=" +
    wiki;

  useEffect(() => {
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        const pageID = Object.keys(data.query.pages)[0];
        setPageData(data.query.pages[pageID].extract);
      });
  }, []);

  function wikiHTML() {
    return { __html: pageData };
  }

  return (
    <div>
      <h1>Location</h1>
      <div dangerouslySetInnerHTML={wikiHTML()}></div>
    </div>
  );
}
