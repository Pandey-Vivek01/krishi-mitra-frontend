import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cropReducer from "./slices/cropSlice";
import postReducer from "./slices/postSlice";
import qaReducer from "./slices/qaSlice";
import weatherReducer from "./slices/weatherSlice";
import marketplaceReducer from "./slices/marketplaceSlice";
import chatReducer from "./slices/chatSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        crop: cropReducer,
        post: postReducer,
        qa: qaReducer,
        weather: weatherReducer,
        marketplace: marketplaceReducer,
        chat: chatReducer,
    },
});

export default store;