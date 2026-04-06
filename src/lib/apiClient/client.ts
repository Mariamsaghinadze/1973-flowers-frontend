"use client";

import { Api } from "./generated/client";

// Used by the client side to make requests to the proxy
export const client = new Api({
  baseURL: "/api",
});
