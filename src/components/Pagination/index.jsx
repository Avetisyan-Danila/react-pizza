import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

function Pagination({ onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={2}
    />
  );
}

export default Pagination;
