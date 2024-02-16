import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../reducers/AuthReducers";

const baseQuery = fetchBaseQuery({

  baseUrl: "https://server.cinab.co.ke/v2",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    const refreshToken = api.getState().auth.refreshToken;
    if (refreshToken) {
      // Include extraOptions when refreshing the token
      const refreshResult = await baseQuery("/refresh", api, extraOptions);

      if (refreshResult?.data) {
        const user = api.getState().auth.user;
        api.dispatch(
          setCredentials({
            token: refreshResult.data.accessToken,
            refreshToken,
            user,
          })
        );
        // Use extraOptions when making the request after token refresh
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    } else {
      api.dispatch(logOut());
    }
  }

  // Log the API result to the console

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Define your endpoints here
  }),
});
