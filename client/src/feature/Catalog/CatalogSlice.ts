import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

// will create reducer and selector for us
const productsAdapter = createEntityAdapter<Product>()

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list()
        } catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.detail(productId)
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ error: err.data })
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetch'
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload)
            state.status = 'idle'
            state.productsLoaded = true
        })
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            state.status = 'idle'
            console.log(action.payload)
        })
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct'
        })
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload)
            state.status = 'idle'
        })
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action)
            state.status = 'idle';
        })
    })
})

// avoid rerender each time go to the page
export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)