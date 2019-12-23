import React from "react";

const Search = props => {
  return (
    <div className={"headerItem " + props.classes}>
      <form>
        <input
          className="form-control searchInput"
          type="text"
          name="search"
          placeholder="Search for products"
        />
      </form>
    </div>
  );
};

export default Search;
