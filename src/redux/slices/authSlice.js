import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") 
        ? JSON.parse(localStorage.getItem("user")) 
        : null,
    token: localStorage.getItem("token") 
        ? localStorage.getItem("token") 
        : null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
};

//Browser refresh hone pe bhi user logged in rahe isliye localStorage se check karta hai
//JSON.parse isliye kyunki localStorage mein strings store hoti hain, object chahiye

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) { 
            state.user = action.payload; // state refers to the CURRENT state of this slice, not just the initial state.
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;