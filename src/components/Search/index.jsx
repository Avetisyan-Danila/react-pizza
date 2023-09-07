import styles from "./Search.module.scss";
import { useContext } from "react";
import { SearchContext } from "../../App";

function Search() {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  // TODO: Сделать импорты изображений
  return (
    <div className={styles.root}>
      <input
        placeholder="Поиск пиццы . . ."
        type="text"
        className={styles.input}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />

      <img
        className={styles.icon}
        src="img/search.svg"
        alt="Поиск пиццы . . ."
      />

      <img
        className={`${styles.reset} ${
          searchValue ? `${styles.reset_active}` : ""
        }`}
        onClick={() => setSearchValue("")}
        src="img/clear.svg"
        alt="Очистить строку поиска"
      />
    </div>
  );
}

export default Search;
