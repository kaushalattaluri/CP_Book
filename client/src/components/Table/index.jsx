import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
const Table = ({ update, data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const headerNames = ["userName", "codechef", "codeforces", "atcoder", "leetcode", "total"];
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "70%" }}>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            {
              headerNames.map((headerName) => (
                <th className={styles.tableHeader} key={headerName} onClick={(e) => update(headerName)}>{headerName.toUpperCase()}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.email}>
              {
                headerNames.map((val) => (
                  <td className={styles.tableCell} key={val} > {el[val]} </td>
                ))
              }
            </tr>

          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </div>
  );
};

export default Table;