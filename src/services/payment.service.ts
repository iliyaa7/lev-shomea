import { decodeAndExtractParams } from "./../utils/extractAndDecodeUrl";
import axios from "axios";

export const getOpenPaymentObj = async (orderNumber: string) => {
  try {
    console.log("Paying");

    const operation = 1;
    const TerminalNumber = 1000;
    const UserName = "kzFKfohEvL6AOF8aMEJz";
    const SumtoBill = 100;
    const CoinId = 1;
    const Language = "he";
    const ProductName = "C101G";
    const APILevel = 10;
    const Codepage = 65001;
    const SuccessRedirectUrl = "https://msapps.mobi/"; // in Production change this to "this-website-url/paymentSucceeded"
    const ErrorRedirectUrl = "https://mako.co.il/"; // in Production change this to "this-website-url/paymentFailed"
    const ReturnValue = orderNumber;
    const AutoRedirect = false;
    const BASE_URL = `https://secure.cardcom.solutions/Interface/LowProfile.aspx?AutoRedirect=${AutoRedirect}&Operation=${operation}&TerminalNumber=${TerminalNumber}&ProductName=${ProductName}&UserName=${UserName}&SumtoBill=${SumtoBill}&CoinId=${CoinId}&Language=${Language}&APILevel=${APILevel}&Codepage=${Codepage}&SuccessRedirectUrl=${SuccessRedirectUrl}&ErrorRedirectUrl=${ErrorRedirectUrl}`;

    // const responseProduction = await axios.post(BASE_URL);
    const response = await axios.get(BASE_URL);
    const responseObject = decodeAndExtractParams(response.data);
    return responseObject;
  } catch (error) {
    console.log(error);
  }
};

export const getFullResponse = async (lowProfileCode: string) => {
  try {
    const operation = 1;
    const TerminalNumber = 1000;
    const UserName = "kzFKfohEvL6AOF8aMEJz";
    const Codepage = 65001;
    const BASE_URL = `https://secure.cardcom.solutions/Interface/BillGoldGetLowProfileIndicator.aspx?Operation=${operation}&TerminalNumber=${TerminalNumber}&Codepage=${Codepage}&lowprofilecode=${lowProfileCode}&UserName=${UserName}`;

    // const responseProduction = await axios.post(BASE_URL);
    const response = await axios.get(BASE_URL);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
