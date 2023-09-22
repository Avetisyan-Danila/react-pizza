import { useDispatch, useSelector } from "react-redux";
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
} from "../redux/slices/filterSlice";

function Categories() {
  const { categoryId } = useSelector(filterSelector);
  const dispatch = useDispatch();

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const handleCategoryClick = (index) => {
    dispatch(setCategoryId(index));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            onClick={() => handleCategoryClick(index)}
            className={categoryId === index ? "active" : ""}
            key={categoryName}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
