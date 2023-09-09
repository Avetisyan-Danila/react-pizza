import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import PizzasNotFound from "../components/PizzaBlock/PizzasNotFound";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import { useSelector } from "react-redux";

function Home() {
  const { searchValue } = useContext(SearchContext);
  const { categoryId, sort } = useSelector((state) => state.filter);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const url = new URL("https://64e6699c09e64530d17ff99d.mockapi.io/items");
    if (categoryId > 0) url.searchParams.append("category", `${categoryId}`);
    if (searchValue) url.searchParams.append("search", `${searchValue}`);
    url.searchParams.append("sortBy", `${sort.sortProperty}`);
    url.searchParams.append("order", "desc");
    url.searchParams.append("page", `${currentPage}`);
    url.searchParams.append("limit", "8");

    setIsLoading(true);
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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

      <h2 className="content__title">Все пиццы</h2>

      <div className={`${items.length !== 0 ? "content__items" : ""}`}>
        {isLoading ? skeletons : pizzas}
      </div>

      <Pagination onChangePage={(pageNumber) => setCurrentPage(pageNumber)} />
    </div>
  );
}

export default Home;
