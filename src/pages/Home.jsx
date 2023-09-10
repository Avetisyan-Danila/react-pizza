import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import PizzasNotFound from "../components/PizzaBlock/PizzasNotFound";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import { useSelector } from "react-redux";
import createItemsUrl from "../utils/createItemsUrl";
import axios from "axios";

function Home() {
  const { searchValue } = useContext(SearchContext);
  const { categoryId, sort } = useSelector((state) => state.filter);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const itemsUrl = createItemsUrl(categoryId, searchValue, sort, currentPage);

    setIsLoading(true);
    axios.get(itemsUrl).then((res) => {
      setItems(res.data);
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
