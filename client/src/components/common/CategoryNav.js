import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const CategoryNav = ({ categories }) => {
  const categoriesList = [];

  for(let category in categories)
    categoriesList.push(
      <div className="col-1" key={category}>
        <Link to={"/products/" + category}>
          <div className="categoryContainer">
            {/* <img
                  className="categoryIcon"
                  src="/images/floursIcon.jpeg"
                  alt="Flours"
                /> */}
            <p>{categories[category].name}</p>
          </div>
        </Link>
      </div>
    );

  return (
    <div className="container categoriesContainer">
      <div className="row text-center justify-content-around">
        {categoriesList}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.firestore.data.categories
});

export default connect(mapStateToProps)(CategoryNav);
