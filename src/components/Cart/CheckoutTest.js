import React from "react";
import { useLocation } from "react-router-dom";
import { getFullResponse } from "../../services/payment.service";
import { verifyPaymentSuccess } from "../../utils/verifyPaymentSuccess";

export default function CheckoutTest() {
  const location = useLocation();
  const handleClick = async () => {
    try {
      const fullResponse = await getFullResponse(
        location.state.openPaymentResObj.lowProfileCode
      );
      console.log(fullResponse);
      console.log(verifyPaymentSuccess(fullResponse));
      return fullResponse;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <iframe
          src={location.state.openPaymentResObj.url}
          height="1000px"
          width="100%"
          title="Iframe Example"
        ></iframe>
        <button onClick={handleClick}></button>
      </div>
    </>
  );
}
