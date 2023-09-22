import styles from "./Search.module.scss";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector, setSearchQuery } from "../../redux/slices/filterSlice";

function Search() {
  const { searchQuery } = useSelector(filterSelector);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(searchQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

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
