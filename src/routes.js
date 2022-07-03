import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CheckoutTest from "./components/Cart/CheckoutTest";
import { AuthContext } from "./Context/Auth/AuthContext";
import { AboutUs } from "./views/AboutUs/AboutUs";
import { Admin } from "./views/Admin/Admin";
import List from "./views/Admin/AdminCmps/List/List";
import {
  userInputs,
  categoryInputs,
  productInputs,
  kosherInputs,
} from "./views/Admin/AdminCmps/New/formSource";
import New from "./views/Admin/AdminCmps/New/New";
import { OrdersView } from "./views/Admin/AdminCmps/OrdersView/OrdersView";
import { Donates } from "./views/Donates/Donates";
import { Login } from "./views/Login/Login";
import { Shop } from "./views/Shop/Shop";

export const AppRoutes = () => {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  const RequireAdminAuth = ({ children }) => {
    return currentUser?.email === "admin@admin.com" ? children : <Navigate to="/login" />;
  };
  return [
    {
      path: "/about",
      component: <AboutUs />,
    },
    {
      path: "/login",
      component: <Login />,
    },
    {
      path: "/shop",
      component: (
        <RequireAuth>
          <Shop />
        </RequireAuth>
      ),
    },
    {
      path: "/paymentSucceeded",
      component: (
        <RequireAuth>
          <CheckoutTest />
        </RequireAuth>
      ),
    },
    {
      path: "/paymentFailed",
      component: (
        <RequireAuth>
          <CheckoutTest />
        </RequireAuth>
      ),
    },
    {
      path: "/donates",
      component: <Donates />,
    },
    {
      path: "/admin",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <Admin />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/users",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <List cmpName={"users"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/users/new",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <New inputs={userInputs} cmpName={"users"} action={"add"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/users/edit/:id",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <New inputs={userInputs} cmpName={"users"} action={"edit"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/categories",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <List cmpName={"categories"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/categories/new",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <New inputs={categoryInputs} cmpName={"categories"} action={"add"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/categories/edit/:id",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <New inputs={categoryInputs} cmpName={"categories"} action={"edit"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/products",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <List cmpName={"products"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/products/new",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <New inputs={productInputs} cmpName={"products"} action={"add"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/products/edit/:id",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <New inputs={productInputs} cmpName={"products"} action={"edit"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/koshers",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <List cmpName={"koshers"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/koshers/new",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <New inputs={kosherInputs} cmpName={"koshers"} action={"add"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/koshers/edit/:id",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <New inputs={kosherInputs} cmpName={"koshers"} action={"edit"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/orders",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <List cmpName={"orders"} />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    {
      path: "/orders/edit/:id",
      component: (
        <RequireAuth>
          <RequireAdminAuth>
            <OrdersView />
          </RequireAdminAuth>
        </RequireAuth>
      ),
    },
    // {
    //   path: "/files",
    //   component: (
    //     <RequireAuth>
    //       <RequireAdminAuth>
    //         <List cmpName={"files"} />
    //       </RequireAdminAuth>
    //     </RequireAuth>
    //   ),
    // },
    // {
    //   path: "/files/new",
    //   component: (
    //     <RequireAuth>
    //       <RequireAdminAuth>
    //         <New inputs={filesInputs} cmpName={"files"} action={"add"} />
    //       </RequireAdminAuth>
    //     </RequireAuth>
    //   ),
    // },
  ];
};
