import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cropReducer from "./slices/cropSlice";
import postReducer from "./slices/postSlice";
import qaReducer from "./slices/qaSlice";
import weatherReducer from "./slices/weatherSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        crop: cropReducer,
        post: postReducer,
        qa: qaReducer,
        weather: weatherReducer,
    },
});

export default store;