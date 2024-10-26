/* 
This file is used to handle generating and retrieving CSRF token for the application. The csrfFetch function fetches as normal, except it also adds the CSRF token to the headers of the request.

All state actions will be fetched using this file.
*/
import Cookies from "js-cookie";

export async function csrfFetch(url, options = {}) {
  // The options.method is GET if there is no method
  options.method = options.method || "GET";

  // Use headers if it exists, otherwise initialize a new
  options.headers = options.headers || {};

  // if request not GET, set Content-Type to application/json and set XSRF-TOKEN to the CSRF token
  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";

    options.headers["XSRF-TOKEN"] = (await restoreCSRF()).token;
  }

  options.credentials = "include";

  // Call window's fetch function with the url and options
  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;

  // If the response is successful, return the response
  return res;
}

// DEVELOPMENT MODE: Restore CSRF token from cookies in browser
export async function restoreCSRF() {
  const res = await fetch("/api/csrf/restore", {
    credentials: "include",
  });

  const data = await res.json();

  return data;
}
