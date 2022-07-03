import { Header } from "./components/Header/Header";
import { AppRoutes } from "./routes";
import { Route, Routes } from "react-router-dom";
import "./assets/styles/styles.scss";
import { Footer } from "./components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { ErrorContext } from "./Context/Error/ErrorContext";

export const App = () => {
  const { error, dispatch } = useContext(ErrorContext);

  useEffect(() => {
    if (error) {
      toast(error.message, {
        type: "error",
      });
      dispatch({ type: "CLEAN" });
    }
  }, [error]);

  return (
    <div className="app-container">
      <Header />
      <Routes>
        {AppRoutes().map((route) => (
          <Route key={route.path} element={route.component} path={route.path} />
        ))}
      </Routes>
      {/* <Footer /> */}
      {error && (
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
    </div>
  );
};
