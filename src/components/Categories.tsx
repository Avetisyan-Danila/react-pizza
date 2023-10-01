import { useDispatch, useSelector } from "react-redux";
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
} from "../redux/slices/filterSlice";
import React from "react";

const categories: string[] = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC = () => {
  const { categoryId } = useSelector(filterSelector);
  const dispatch = useDispatch();

  const handleCategoryClick = (index: number) => {
    dispatch(setCategoryId(index));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName: string, index: number) => (
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
};

export default Categories;
