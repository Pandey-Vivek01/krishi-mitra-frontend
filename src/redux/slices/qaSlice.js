import { createSlice } from "@reduxjs/toolkit";

const qaSlice = createSlice({
    name: "qa",
    initialState: {
        questions: [],
        loading: false,
        totalPages: 1,
        currentPage: 1,
    },
    reducers: {
        setQuestions(state, action) {
            state.questions = action.payload;
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

export const { setQuestions, setLoading, setPagination } = qaSlice.actions;
export default qaSlice.reducer;