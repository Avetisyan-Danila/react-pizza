import { useSelector } from "react-redux";
import React from "react";
import { useAppDispatch } from "../redux/store";
import { filterSelector } from "../redux/slices/filter/selectors";
import { setCategoryId, setCurrentPage } from "../redux/slices/filter/slice";

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
  const dispatch = useAppDispatch();

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
