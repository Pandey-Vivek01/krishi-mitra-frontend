import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        loading: false,
        totalPages: 1,
        currentPage: 1,
    },
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setPagination(state, action) {
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
        },
    },
});

export const { setPosts, setLoading, setPagination } = postSlice.actions;
export default postSlice.reducer;