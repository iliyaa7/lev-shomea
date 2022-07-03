import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./Context/Auth/AuthContext";
import { CartContextProvider } from "./Context/Cart/CartContext";
import { CategoriesContextProvider } from "./Context/Categories/CategoriesContext";
import { InputRefContextProvider } from "./Context/InputRefContext/InputRefContext";
import { IsHeaderOpenProvider } from "./Context/IsHeaderOpen/IsHeaderOpenContext";
import { ErrorContextProvider } from "./Context/Error/ErrorContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Router>
    <AuthContextProvider>
      <CartContextProvider>
        <IsHeaderOpenProvider>
          <InputRefContextProvider>
            <CategoriesContextProvider>
              <ErrorContextProvider>
                <App />
              </ErrorContextProvider>
            </CategoriesContextProvider>
          </InputRefContextProvider>
        </IsHeaderOpenProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </Router>
);
