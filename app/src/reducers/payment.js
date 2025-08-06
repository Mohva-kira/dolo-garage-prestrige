import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { current } from "@reduxjs/toolkit";
import { setMessage } from "./message"
import Base64 from "base-64"

const initialState = {
    payData: {},
    status: 'idle',
    error: null
};

// Configuration de l'API URL selon l'environnement
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_PROXY_URL || 'https://your-proxy-domain.com/api/ngenius/'
    : 'http://localhost:3008/api/ngenius/';

// Configuration pour les endpoints CinetPay
const CINETPAY_BASE_URL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROXY_URL?.replace('/api/ngenius/', '') || 'http://162.19.229.99:3009'
    : 'http://localhost:3008';

// Base query pour N-Genius
const ngeniusBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        console.log(getState());
        console.log("HEADERS", headers);
        headers.set("Content-Type", "application/vnd.ni-identity.v1+json");
        headers.set("Authorization", "MmExYzQ4ZGEtYmFmOC00ZDQ3LWFhMjgtNzNhMjM2OWI2NDNhOjBiNmM1YmRiLTAzNDYtNDA0Mi05OTQ0LTkyNTRkMzAxZmRkNg==")
        return headers;
    },
});

// Base query pour CinetPay
const cinetPayBaseQuery = fetchBaseQuery({
    baseUrl: CINETPAY_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
        return headers;
    },
});

export const paymentApi = createApi({
   
    reducerPath: 'paymentApi',
    baseQuery: async (args, api, extraOptions) => {
        // Détermine quelle base query utiliser selon l'endpoint
        if (args.url && (args.url.includes('/api/payment') || args.url.includes('payment'))) {
            return cinetPayBaseQuery(args, api, extraOptions);
        } else {
            return ngeniusBaseQuery(args, api, extraOptions);
        }
    },
    
    endpoints: (builder) => ({
        getToken: builder.mutation({
            query: () => ({
                url: `identity/auth/access-token`,
                method: 'POST',
               
            }),
        }),


        // Endpoint pour initier un paiement CinetPay
        initiateCinetPayPayment: builder.mutation({
            query: (paymentData) => ({
                url: '/api/payment',
                method: 'POST',
                body: paymentData,
            }),
        }),

        // Endpoint pour vérifier le statut d'un paiement CinetPay
        checkPaymentStatus: builder.query({
            query: (transactionId) => ({
                url: `/api/payment/status/${transactionId}`,
                method: 'GET',
            }),
        }),

    }),
})  


const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        filterProduct(state) {

        }
    },


    extraReducers(builder) {
        builder.addMatcher(paymentApi.endpoints.getToken.matchFulfilled, (state, action) => {
            console.log('Payement data', action.payload)
            state.payData = action.payload
            
        })

        builder.addMatcher(paymentApi.endpoints.initiateCinetPayPayment.matchFulfilled, (state, action) => {
            console.log('CinetPay payment data', action.payload)
            state.payData = action.payload
            state.status = 'fulfilled'
        })

        builder.addMatcher(paymentApi.endpoints.initiateCinetPayPayment.matchPending, (state, action) => {
            state.status = 'pending'
        })

        builder.addMatcher(paymentApi.endpoints.initiateCinetPayPayment.matchRejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error.message
        })

      
        // builder.addMatcher(playlistApi.endpoints.addToPlaylist.matchFulfilled, (state: any, action: any) => {
        //     state.playlists.push(action.payload.data)
        // })
    }
});




export default paymentSlice.reducer;
export const { useGetTokenMutation, useInitiateCinetPayPaymentMutation, useCheckPaymentStatusQuery } = paymentApi;