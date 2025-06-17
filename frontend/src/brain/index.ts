import { auth } from "app/auth";
import { API_HOST, API_PATH, API_PREFIX_PATH } from "../constants";
import { Brain } from "./Brain";
import type { RequestParams } from "./http-client";

const isLocalhost = /localhost:\d{4}/i.test(window.location.origin);

const constructBaseUrl = (): string => {
  if (isLocalhost) {
    // In workspace (dev)
    return `${window.location.origin}${API_PATH}`;
  }

  if (API_HOST && API_PREFIX_PATH) {
    // In deployed app (prod)
    return `https://${API_HOST}${API_PREFIX_PATH}`;
  }

  // In deployed app (prod)
  return `https://api.databutton.com${API_PATH}`;
};

type BaseApiParams = Omit<RequestParams, "signal" | "baseUrl" | "cancelToken">;

const constructBaseApiParams = (): BaseApiParams => {
  return {
    credentials: "include",
    secure: true,
  };
};

const constructClient = () => {
  const baseUrl = constructBaseUrl();
  const baseApiParams = constructBaseApiParams();

  return new Brain({
    baseUrl,
    baseApiParams,
    customFetch: (url, options) => {
      if (API_HOST && API_HOST !== "api.databutton.com") {
        // Remove /routes/ segment from start of path if
        // running API through custom domain
        return fetch(url.replace("/api/routes/", "/api/"), options);
      }

      return fetch(url, options);
    },
    securityWorker: async () => {
      return {
        headers: {
          Authorization: await auth.getAuthHeaderValue(),
        },
      };
    },
  });
};

const brain = constructClient();

export default brain;
