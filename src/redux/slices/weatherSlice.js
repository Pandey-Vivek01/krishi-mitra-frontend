import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        weatherData: null,
        recommendations: [],
        loading: false,
    },
    reducers: {
        setWeatherData(state, action) {
            state.weatherData = action.payload;
        },
        setRecommendations(state, action) {
            state.recommendations = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setWeatherData, setRecommendations, setLoading } = weatherSlice.actions;
export default weatherSlice.reducer;