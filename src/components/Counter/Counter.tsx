import { useContext } from "react";
import { CartContext } from "../../Context/Cart/CartContext";
import "./Counter.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const Counter: React.FC<{ id: string; quantity: number; styleCmp: string }> = ({
  id,
  quantity,
  styleCmp,
}) => {
  const { dispatch } = useContext(CartContext);

  const incrementCount = () => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, isIncrement: true } });
  };
  const decrementCount = () => {
    if (checkZero()) {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
      return;
    }
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, isIncrement: false } });
  };

  const checkZero = () => {
    return quantity === 1;
  };

  return (
    <div className={`counter ${styleCmp}`}>
      <AddIcon className="increment" onClick={incrementCount} />
      <p className="quantity">{quantity}</p>
      <RemoveIcon className="decrement" onClick={decrementCount} />
    </div>
  );
};
