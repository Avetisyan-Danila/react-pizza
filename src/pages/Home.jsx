import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import PizzasNotFound from "../components/PizzaBlock/PizzasNotFound";
import createItemsUrl from "../utils/createItemsUrl";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/slices/filterSlice";

function Home() {
  const { searchValue } = useContext(SearchContext);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const itemsUrl = createItemsUrl(categoryId, searchValue, sort, currentPage);

    setIsLoading(true);
    axios.get(itemsUrl).then((res) => {
      setItems(res.data);
      setIsLoading(false);
    });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

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

      <Pagination onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
