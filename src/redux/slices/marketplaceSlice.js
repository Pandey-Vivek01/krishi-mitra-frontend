import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  myProducts: [],
  selectedProduct: null,
  orders: [],
  farmerOrders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setMyProducts: (state, action) => {
      state.myProducts = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addProduct: (state, action) => {
      state.myProducts.unshift(action.payload);
    },
    updateProduct: (state, action) => {
      state.myProducts = state.myProducts.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
    },
    removeProduct: (state, action) => {
      state.myProducts = state.myProducts.filter((p) => p._id !== action.payload);
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setFarmerOrders: (state, action) => {
      state.farmerOrders = action.payload;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    updateOrderInList: (state, action) => {
      state.farmerOrders = state.farmerOrders.map((o) =>
        o._id === action.payload._id ? action.payload : o
      );
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setMyProducts,
  setSelectedProduct,
  addProduct,
  updateProduct,
  removeProduct,
  setOrders,
  setFarmerOrders,
  setSelectedOrder,
  updateOrderInList,
  setError,
} = marketplaceSlice.actions;

export default marketplaceSlice.reducer;