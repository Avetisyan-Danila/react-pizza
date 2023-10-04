import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock, { PizzaBlockProps } from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import PizzasNotFound from "../components/PizzaBlock/PizzasNotFound";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { filterSelector, setFilters } from "../redux/slices/filterSlice";
import { sortItems } from "../helpers/constants";
import {
  FetchPizzaArgs,
  fetchPizzas,
  pizzasSelector,
} from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(pizzasSelector);
  const { categoryId, sort, currentPage, searchQuery } =
    useSelector(filterSelector);

  const getPizzas = () => {
    dispatch(
      fetchPizzas({
        categoryId,
        searchQuery,
        sortBy: sort.sortProperty,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  // Если изменились параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, searchQuery, currentPage, navigate]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
  useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search) as unknown as FetchPizzaArgs;

      const sort = sortItems.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          categoryId: params.categoryId,
          currentPage: params.currentPage,
          sort: sort || sortItems[0],
          searchQuery: params.searchQuery,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchQuery, currentPage]);

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items.length ? (
    items.map((item: PizzaBlockProps) => <PizzaBlock {...item} key={item.id} />)
  ) : (
    <PizzasNotFound />
  );

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      {/*TODO: Сделать ошибку красивой*/}
      {status === "error" ? (
        <div>ошибка</div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className={`${items.length !== 0 ? "content__items" : ""}`}>
            {status === "loading" ? skeletons : pizzas}
          </div>
          {categoryId === 0 ? <Pagination /> : ""}
        </>
      )}
    </div>
  );
};

export default Home;
