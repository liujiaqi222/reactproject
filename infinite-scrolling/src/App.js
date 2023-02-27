import { useState, useEffect, useRef, useCallback } from "react";
import useBookSearch from "./useBookSearch";

export default function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { books, hasMore, error, loading } = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      console.log("called");
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  return (
    <>
      <input type="text" onChange={handleSearch} value={query} />
      <div>
        {books.map((book, index) => {
          if (index === books.length - 1) {
            return (
              <p ref={lastBookElementRef} key={book}>
                {book}
              </p>
            );
          }
          return <p key={book}>{book}</p>;
        })}
      </div>
      <div>{loading && "loading..."}</div>
      <div>{error && "error"}</div>
    </>
  );
}
