import "./Cart.scss";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../Context/Cart/CartContext";
import { Counter } from "../Counter/Counter";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../Context/Auth/AuthContext";
import { getOpenPaymentObj } from "../../services/payment.service";
import Modal from "react-modal";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import tnc from "../../assets/files/tnc.png";
import "../../assets/files/tnc.pdf";
import { PaymentStatusEnum } from "../../enums/PaymentStatusEnum";
import { OrderStatusEnum } from "../../enums/OrderStatusEnum";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "80%",
  },
};
const customStylesPayment = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "80%",
  },
};

export const Cart = () => {
  const navigate = useNavigate();
  const [sortedProductsByCategory, setSortedProductsByCategory] = useState({});
  const { cartProducts, dispatch } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const [openPaymentUrl, setOpenPaymentUrl] = useState<string>("");
  const [isSigned, setIsSigned] = useState(false);
  const [pdf, setPdf] = useState("");
  const [isTncModalOpen, setIsTncModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    orgenizeProductDataForCart();
  }, [cartProducts]);

  // useEffect(() => {
  //   window.addEventListener("message", (event) => {
  //     console.log(event);

  //     // if (event.origin !== "https://secure.cardcom.solutions") return;
  //     // if (event.data.action === "RedirectingCustOnCardcomPage") {
  //     //   console.log(event.data.action);
  //     // }
  //   });
  // }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "tnc"),
      (snapShot) => {
        let list: any = [];
        snapShot.docs.forEach(async (doc) => {
          // if (doc.data().isActive)
          list.push({ id: doc.id, ...doc.data() });
        });
        console.log(list);
        setPdf(list[0].img);
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

  const orgenizeProductDataForCart = () => {
    const sortedProducts: object = cartProducts?.reduce(
      (sortObj: any, product: any) => {
        sortObj.hasOwnProperty(product.category)
          ? sortObj[product.category].push(product)
          : (sortObj[product.category] = [product]);
        return sortObj;
      },
      {}
    );
    setSortedProductsByCategory(sortedProducts);
  };
  const proceedCheckout = async () => {
    try {
      
      if (getCartNumberOfItems() === 0) return;
      const res = await addDoc(collection(db, "orders"), {
        clientName: currentUser.email,
        products: [...cartProducts],
        totalAmount: getTotalCartAmount(),
        totalproducts: getCartNumberOfItems(),
        timeStamp: serverTimestamp(),
        paymentStatus: PaymentStatusEnum.pending,
        orderStatus: OrderStatusEnum.pending
      });
      if (!res) {
        console.log('we couldnt save save your order pleae try again')
        return
      }

      const openPaymentResObj = await getOpenPaymentObj(res.id);
      if (openPaymentResObj) {
        setOpenPaymentUrl(openPaymentResObj.url);
        setIsPaymentModalOpen(true);
      }
      // Todo - redirect to payment page and only after payment was succesfull we will add new order to db
      // console.log("Succesful payment ");
      // console.log("Succesful payment ", res);
    } catch (error) {
      dispatch({ type: "SET", payload: error });
      console.log(error);
    }
  };
  const getCartBodyHtml = () => {
    const categoriesObj: any = sortedProductsByCategory;
    let itemList: any[] = [];
    for (const category in categoriesObj) {
      itemList.push(
        <p className="category" key={getRandomKey()}>
          {category}
        </p>
      );
      itemList.push(getProductsHtml(categoriesObj[category]));
    }
    return itemList;
  };
  const getProductsHtml = (products: Array<[]>) => {
    return (
      <ul className="items" key={getRandomKey()}>
        {products.map(getProductHtml)}
      </ul>
    );
  };
  const getProductHtml = (product: any) => {
    return (
      <li className="item" key={getRandomKey()}>
        <Counter
          id={product.id}
          quantity={product?.quantity || 1}
          styleCmp={"cart"}
        />
        <p className="quantity-placeholder">{product?.quantity || 1}</p>
        <img src={product.img} alt="תמונה" />
        <p className="name">{product.name}</p>
        <span className="price">₪{product.price}</span>
        <DeleteIcon
          className="remove-btn"
          onClick={() => removeFromCart(product.id)}
        />
      </li>
    );
  };
  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };
  const getTotalCartAmount = () => {
    if (cartProducts?.length < 1) return 0;
    return cartProducts?.reduce((sum: number, product: any) => {
      if (product?.quantity) return sum + product.price * product.quantity;
      return sum + product.price;
    }, 0);
  };
  const getCartNumberOfItems = () => {
    if (cartProducts?.length < 1) return 0;
    return cartProducts?.reduce((sum: number, product: any) => {
      return sum + (product?.quantity || 1);
    }, 0);
  };
  const getRandomKey = (length = 6) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return key;
  };
  const closeMenu = () => {
    const elShopMenu = document.querySelector(".screen");
    // elShopMenu.checked = false;
  };
  const onCloseModal = () => {
    setIsTncModalOpen(false);
    setIsPaymentModalOpen(false);
  };
  const openTncModal = () => {
    setIsTncModalOpen(true);
  };
  const onDocumentLoadSuccess = (doc: any) => {
    console.log(doc);
    console.log(doc.numPages);
    setNumPages(doc.numPages);
  };
  const handleTncApproval = () => {
    console.log("log?1");
    onCloseModal();
    setIsSigned(!isSigned);
    proceedCheckout();
  };

  return (
    <>
      <div className="cart-container">
        <div className="cart-header">
          <h5>עגלת הקניות שלי</h5>
          <div className="cart-header-details">
            <p className="item-count">{getCartNumberOfItems()} מוצרים</p>
            <span className="total-amount">₪{getTotalCartAmount()}</span>
          </div>
        </div>
        <div className="cart-body">{getCartBodyHtml()}</div>
        <button
          className="complete-order"
          onClick={() =>
            isSigned ? proceedCheckout() : setIsTncModalOpen(true)
          }
        >
          סיום קניה ₪{getTotalCartAmount()}
        </button>
        <div className="modal-container">
          <Modal
            isOpen={isTncModalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="TNC Modal"
          >
            <button onClick={onCloseModal}>X</button>
            <FormControlLabel
              onChange={handleTncApproval}
              control={<Checkbox />}
              label="אנא אשר/י שקראת את התקנון"
            />
            <div className="pdf-container">
              <Document
                // file={`https://firebasestorage.googleapis.com/v0/b/test-project-e4947.appspot.com/o/%D7%AA%D7%A7%D7%A0%D7%95%D7%9F.pdf?alt=media&token=bab06960-fff8-4d24-963a-dd78f0a8fe50`}
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div>
            {/* <img
              src={`https://firebasestorage.googleapis.com/v0/b/test-project-e4947.appspot.com/o/%D7%AA%D7%A7%D7%A0%D7%95%D7%9F.pdf?alt=media&token=bab06960-fff8-4d24-963a-dd78f0a8fe50`}
              style={{ width: "300px" }}
              alt=""
            /> */}
            {/* <div>לצפייה בתקנון לחץ כאן</div> */}
          </Modal>
          <Modal
            isOpen={isPaymentModalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onCloseModal}
            style={customStylesPayment}
            contentLabel="Example Modal"
          >
            <button onClick={onCloseModal}>X</button>
            <iframe
              ref={iframeRef}
              height="90%"
              width="100%"
              src={openPaymentUrl}
              title="setPaymentMethod"
            ></iframe>
          </Modal>
        </div>
      </div>
    </>
  );
};
