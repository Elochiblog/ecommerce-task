import { createSlice } from "@reduxjs/toolkit";
import { mockProducts } from "../../data/mockProducts.js";

const initialState = {
  items: mockProducts,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setProducts(state, action) {
      state.items = action.payload;
      state.loading = false;
    },
    setProductsError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProductsLoading, setProducts, setProductsError } =
  productsSlice.actions;
export const selectAllProducts = (state) => state.products.items;
export const selectProductById = (id) => (state) =>
  state.products.items.find((p) => String(p.id) === String(id));

export default productsSlice.reducer;
