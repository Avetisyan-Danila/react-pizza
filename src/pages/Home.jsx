import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import PizzasNotFound from "../components/PizzaBlock/PizzasNotFound";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/slices/filterSlice";
import { sortItems } from "../helpers/constants";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state) => state.pizzas);
  const { categoryId, sort, currentPage, searchQuery } = useSelector(
    (state) => state.filter
  );

  const getPizzas = () => {
    dispatch(fetchPizzas({ categoryId, searchQuery, sort, currentPage }));
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
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortItems.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, [dispatch]);

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
    items.map((item) => <PizzaBlock {...item} key={item.id} />)
  ) : (
    <PizzasNotFound />
  );

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

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
}

export default Home;
