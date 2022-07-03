import "./Categories.scss";
import { useContext, useEffect, useState } from "react";
import { getDocs, collection, getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { CategoriesContext } from "../../Context/Categories/CategoriesContext";

export const Categories = () => {
  // const categories = [
  //   "בשר ודגים",
  //   "מוצרי חלב",
  //   "ניקיון",
  //   "מוצרי יסוד",
  //   "מוצרי פארמה",
  //   "מטרנה",
  //   "טיטולים",
  // ];
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState(["הכל"]);
  const { dispatch } = useContext(CategoriesContext);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "categories"),
      (snapShot) => {
        let list: any = [];
        snapShot.docs.forEach(async (doc) => {
          list.push({ ...doc.data() });
        });
        list = organizeCategoryData(list);
        setCategories(list);
      },
      (error) => {
        console.log(error);
        dispatch({ type: "SET", payload: error });
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleFilter = (category: string) => {
    let categoriesArray = [...activeCategories];
    if (categoriesArray.includes(category)) {
      categoriesArray = categoriesArray.filter((categoryName) => categoryName !== category);
      if (categoriesArray.length === 0) categoriesArray.push("הכל");
    } else {
      if (categoriesArray.includes("הכל")) categoriesArray = [];
      categoriesArray.push(category);
    }
    setActiveCategories(categoriesArray);
    updateCategoriesState(categoriesArray);
  };

  const organizeCategoryData = (list: []) => {
    return list.map((item: any) => item.category);
  };

  const showAllCategories = () => {
    let categoriesArray = ["הכל"];
    setActiveCategories(categoriesArray);
    updateCategoriesState(categoriesArray);
  };

  const isFiltered = (category: string) => {
    return activeCategories.includes(category);
  };

  const isFilterExist = () => {
    if (activeCategories.includes("הכל") && activeCategories.length === 1) return true;
    return false;
  };

  const updateCategoriesState = (categoriesArray: string[]) => {
    dispatch({ type: "SET_CATEGORIES", payload: categoriesArray });
  };

  return (
    categories && (
      <div className="categories-container">
        <h3>סינון לפי:</h3>
        <div className="wrapper">
          {categories?.map((item: any, idx) => {
            return (
              <div
                className={isFiltered(item) ? "category active" : "category"}
                onClick={() => handleFilter(item)}
                key={idx}
              >
                {item}
              </div>
            );
          })}
          <div
            className={isFilterExist() ? "category active" : "category"}
            onClick={showAllCategories}
          >
            הכל
          </div>
        </div>
      </div>
    )
  );
};
