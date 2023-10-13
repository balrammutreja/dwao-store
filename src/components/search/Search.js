import React from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="pro-sidebar-search mb-50 mt-25">
      {/* <BiSearch size={18} className={styles.icon} /> */}

      <input
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
