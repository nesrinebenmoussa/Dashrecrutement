import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import annonceService from "./annonceService";

const initialState = {
    annonces: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create
export const create = createAsyncThunk(
    "annonces/create",
    async(data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await annonceService.create(data);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get all
export const getAll = createAsyncThunk(
    "annonces/getAll",
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await annonceService.getAll(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getById = createAsyncThunk(
    "annonces/getbyid",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await annonceService.getById(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
// Delete
export const remmove = createAsyncThunk(
    "annonces/delete",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await annonceService.deleteById(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const update = createAsyncThunk(
    "annonces/update",
    async(id, data, thunkAPI) => {
        try {
            return await annonceService.updateAnnonce(id, data);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const annonceSlice = createSlice({
    name: "annonces",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.annonces.push(action.payload);
            })
            .addCase(create.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAll.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.annonces = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(remmove.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(remmove.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.annonces = state.annonces.filter(
                    (a) => a._id !== action.payload.id
                );
            })
            .addCase(remmove.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                state.annonces = action.payload;
            })
            .addCase(getById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(update.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.annonces = action.payload;
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = annonceSlice.actions;
export default annonceSlice.reducer;