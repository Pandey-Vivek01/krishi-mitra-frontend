import { createSlice } from "@reduxjs/toolkit";

const cropSlice = createSlice({
    name: "crop",
    initialState: {
        crops: [],
        loading: false,
        totalPages: 1,
        currentPage: 1,
    },
    reducers: {
        setCrops(state, action) {
            state.crops = action.payload;
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

export const { setCrops, setLoading, setPagination } = cropSlice.actions;
export default cropSlice.reducer;