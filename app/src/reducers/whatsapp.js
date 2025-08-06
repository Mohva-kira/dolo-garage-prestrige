import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const initialState = {
  data: null,
};

export const whatsappSlice = createSlice({
  name: "whatsapp",
  initialState,
  reducers: {
    setApplication: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = state.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setApplication } = whatsappSlice.actions;
export default whatsappSlice.reducer;

const APIURL = "https://graph.facebook.com/v22.0/587745037765750";
const APIKEY =
  "EAANC018Oq9gBO3aQgYdrXRkeVjPaP0eeaFee4QCRLTqCiUL7gqxa6rG0LZAkIYWYpAS0WwC9zNPtjw5ZB3KiZADcAqCci8T6jza62q5v2SYpeUJBeKuOL3E8utKeISy5ZAcLUEtnn7dZA2CVHfw9zZA75aq11wAJ9NWEmiVpUVeGiQ5xLIpfwhGzz7JfoD2wZDZD";

console.log("APIURL", APIURL);
// console.log("APIKEY", APIKEY);

// if(!APIURL || !APIKEY) {
//     console.error("Environment variables WHATSAPP_API_URL and WHATSAPP_API_KEY must be set.");
//     throw new Error("Missing required environment variables for WhatsApp API.");
// }
export const whatsappApi = createApi({
  reducerPath: "whatsappApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://graph.facebook.com/v22.0/587745037765750",
    prepareHeaders: (headers, { getState }) => {
      const token = APIKEY;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: data.to,
          type: "text",
          text: {
            body: data.body,
          },
        },
      }),
    }),
    sendMessageTemplate: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: {
          to: data.to,
          type: "template",
          messaging_product: "whatsapp",
          template: {
            
            name: data.template || "command_msg",
            language: {
              code: "fr",
              policy: "deterministic",
            },
            components: data.components   || []
          },
        },
      }),
    }),
  }),
});

// Exports des hooks générés automatiquement par RTK Query
export const { useSendMessageMutation, useSendMessageTemplateMutation } =
  whatsappApi;
