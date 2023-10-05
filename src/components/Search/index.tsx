import styles from "./Search.module.scss";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import searchSVG from "../../assets/search.svg";
import clearSVG from "../../assets/clear.svg";
import { filterSelector } from "../../redux/slices/filter/selectors";
import { setSearchQuery } from "../../redux/slices/filter/slice";

const Search: React.FC = () => {
  const { searchQuery } = useSelector(filterSelector);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleResetClick = () => {
    setInputValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <input
        placeholder="Поиск пиццы . . ."
        type="text"
        ref={inputRef}
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
      />

      <img className={styles.icon} src={searchSVG} alt="Поиск пиццы . . ." />

      <img
        className={`${styles.reset} ${
          inputValue ? `${styles.reset_active}` : ""
        }`}
        onClick={handleResetClick}
        src={clearSVG}
        alt="Очистить строку поиска"
      />
    </div>
  );
};

export default Search;
