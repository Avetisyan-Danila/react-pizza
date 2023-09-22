import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector, setCurrentPage } from "../../redux/slices/filterSlice";

function Pagination() {
  const { currentPage } = useSelector(filterSelector);
  const dispatch = useDispatch();

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <ReactPaginate
      className={styles.root}
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      forcePage={currentPage - 1}
      pageCount={2}
    />
  );
}

export default Pagination;
