import axios from "axios";

export const baseUrlBgImg = "https://bing.biturl.top/";

const baseUrlAutoComplete = "https://api.bing.microsoft.com";
const subscriptionKey = "f1a75f25863b43bc93adb3b995389353";

const headers = {
  "Ocp-Apim-Subscription-Key": subscriptionKey,
  "Ocp-Apim-Subscription-Region": "global",
};

export const bingSearch = axios.create({
  baseURL: baseUrlAutoComplete,
  headers: headers,
});

export const bgImg = axios.create({
  baseURL: baseUrlBgImg,
});
