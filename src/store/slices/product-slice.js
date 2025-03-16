import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Async thunk to fetch products from Firebase
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
    });
    return products;
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        addReviewToProduct: (state, action) => {
            const { productId, review } = action.payload;
            const product = state.products.find(p => p.id === productId);
            if (product) {
                if (!product.reviews) {
                    product.reviews = [];
                }
                product.reviews.push(review);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addReviewToProduct } = productSlice.actions;

export default productSlice.reducer;
