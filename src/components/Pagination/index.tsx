import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useSelector } from "react-redux";
import React from "react";
import { useAppDispatch } from "../../redux/store";
import { filterSelector } from "../../redux/slices/filter/selectors";
import { setCurrentPage } from "../../redux/slices/filter/slice";

const Pagination: React.FC = () => {
  const { currentPage } = useSelector(filterSelector);
  const dispatch = useAppDispatch();

  const onChangePage = (number: number) => {
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
};

export default Pagination;
