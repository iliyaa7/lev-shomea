import { Cart } from "../../components/Cart/Cart";
import { Categories } from "../../components/Categories/Categories";
import "./Shop.scss";
import exampleForProductImg from "../../assets/photos/exampleForProductImg.jpeg";
import { useContext, useEffect, useState, useRef } from "react";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { CartContext } from "../../Context/Cart/CartContext";
import { Counter } from "../../components/Counter/Counter";
import AddIcon from "@mui/icons-material/Add";
import { CategoriesContext } from "../../Context/Categories/CategoriesContext";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CloseMenuByPageClick from "../../hooks/CloseMenuByPageClick";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const { cartProducts, dispatch } = useContext(CartContext);
  const { categories } = useContext(CategoriesContext);
  const pageRef = useRef<HTMLDivElement>(null);

  CloseMenuByPageClick(pageRef);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       let productList: any = [];
  //       //Fix any - ts
  //       const querySnapshot = await getDocs(collection(db, "products"));
  //       querySnapshot.forEach((doc) => {
  //         productList.push({ id: doc.id, ...doc.data() });
  //       });
  //       setProducts(productList);
  //     } catch (error) {}
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        let list: any = [];
        snapShot.docs.forEach(async (doc) => {
          if (doc.data().isActive) list.push({ id: doc.id, ...doc.data() });
        });
        setProducts(list);
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

  const getKoshers = (koshers: string[]) => {
    if (koshers?.length < 1) return;
    return koshers?.map((kosher, idx) => {
      return (
        <span key={idx}>
          {kosher} {idx + 1 > koshers.length - 1 ? "" : " | "}
        </span>
      );
    });
  };

  const addToCart = (product: any) => {
    if (isExistOnCart(product.id)) return;
    product.quantity = 1;
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const isExistOnCart = (id: string) => {
    return cartProducts?.some((product: any) => product.id === id);
  };

  const getQuantityFromCart = (id: string) => {
    const item = cartProducts.find((product: any) => product.id === id);
    return item?.quantity;
  };

  return (
    <div ref={pageRef} className="shop-container">
      <Categories />
      <div className="shop-wrapper">
        <div className="grid-wrapper">
          {products.map((item: any) => {
            // Fix any - ts
            return (
              (categories.includes("הכל") || categories.includes(item.category)) && (
                <div className="item" onClick={() => addToCart(item)} key={item.id}>
                  <div className={isExistOnCart(item.id) ? `display-none` : `add`}>
                    <AddIcon className="add-btn" />
                  </div>
                  <div className="img-container">
                    <img
                      className={isExistOnCart(item.id) ? `item-img on-cart` : `item-img`}
                      src={item.img}
                      alt="תמונה"
                    />
                  </div>
                  <div className="item-datails">
                    <p className="brand-capacity">
                      {item.brand} {item.brand ? " | " : ""} {item.capacity}
                    </p>
                    <p className="name">{item.name}</p>
                    <p className="price">₪{item.price}</p>
                    <p className="kosher-types">{getKoshers(item?.koshers)}</p>
                  </div>
                  {isExistOnCart(item.id) && (
                    <Counter
                      id={item.id}
                      quantity={getQuantityFromCart(item.id) || 1}
                      styleCmp={"shop"}
                    />
                  )}
                </div>
              )
            );
          })}
        </div>

        <input type="checkbox" id="shop-menu" />
        <label htmlFor="shop-menu" className="shop-menu">
          <ShoppingCartCheckoutIcon />
        </label>
        <Cart />
      </div>
    </div>
  );
};
