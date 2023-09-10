import styles from "./Search.module.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { SearchContext } from "../../App";

function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState(searchValue);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchValue(inputValue);
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, setSearchValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleResetClick = () => {
    setInputValue("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <input
        placeholder="Поиск пиццы . . ."
        type="text"
        ref={inputRef}
        className={styles.input}
        value={inputValue}
        onInput={handleInputChange}
      />

      <img
        className={styles.icon}
        src="img/search.svg"
        alt="Поиск пиццы . . ."
      />

      <img
        className={`${styles.reset} ${
          inputValue ? `${styles.reset_active}` : ""
        }`}
        onClick={handleResetClick}
        src="img/clear.svg"
        alt="Очистить строку поиска"
      />
    </div>
  );
}

export default Search;
