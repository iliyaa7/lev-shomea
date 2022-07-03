import {
  PaymentStatusEnum,
  PaymentStatusEnumType,
} from "../enums/PaymentStatusEnum";
interface paymentSuccessObject {
  isProccessComplete: boolean;
  paymentStatus: number;
}

export const verifyPaymentSuccess = (
  fullResponse: string
): paymentSuccessObject => {
  const dealResponse = extractDealResponse(fullResponse);
  if (!dealResponse && dealResponse!== 0)
    return {
      isProccessComplete: false,
      paymentStatus: PaymentStatusEnum.failed,
    };
  const isProccessComplete = true;
  const paymentStatus = transferDealResponseEnum(
    dealResponse,
    PaymentStatusEnum
  );
  return { isProccessComplete, paymentStatus };
};




const extractDealResponse = (fullResponse: string): false | number => {
  const decodedResponse = decodeURIComponent(fullResponse);
  const dealResponseIndex =
    decodedResponse.indexOf("DealRespone=") + "DealRespone=".length;
  if (dealResponseIndex === -1) return false;
  return parseInt(
    decodedResponse.slice(dealResponseIndex, dealResponseIndex + 1)
  );
};

const transferDealResponseEnum = (
  dealResponse: number,
  paymentStatusEnum: PaymentStatusEnumType
): number => {
  const keyOfPaymentEnum = Object.keys(PaymentStatusEnum).find(
    (key) =>
      paymentStatusEnum[key as keyof typeof paymentStatusEnum] === dealResponse
  );
  
  return paymentStatusEnum[keyOfPaymentEnum as keyof typeof paymentStatusEnum];
};
