interface DecodedParamsObj {
    url: string;
    lowProfileCode: string;
}

export const decodeAndExtractParams = (cardcomResponse: string): DecodedParamsObj | null=> {
  const decodedResponse = decodeURIComponent(cardcomResponse);
  const startLowProfileCode = decodedResponse.indexOf("LowProfileCode=") + "LowProfileCode=".length
  const endLowProfileCode = decodedResponse.indexOf("&url");
  const startUrlIndex = decodedResponse.indexOf("https");
  const endUrlIndex = decodedResponse.indexOf("https", startUrlIndex + 1);
  if(startLowProfileCode === -1 || startUrlIndex === -1) return null
  const url = decodedResponse.slice(startUrlIndex, endUrlIndex);
  const lowProfileCode = decodedResponse.slice(startLowProfileCode, endLowProfileCode);
  return {url, lowProfileCode};
};
