import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import condidatService from "./condidatService";

const initialState = {
    condidats: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new condidat
export const createCondidat = createAsyncThunk(
    "condidats/create",
    async(Data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await condidatService.createCondidat(Data, token);
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

// Get all condidats
export const getCondidats = createAsyncThunk(
    "condidats/getAll",
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await condidatService.getCondidats(token);
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

export const changeStatus = createAsyncThunk(
    "condidats/changeStatus",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await condidatService.changeStatus(id, token);
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
    "condidats/getbyid",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await condidatService.getById(id, token);
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
// Delete condidat
export const deleteCondidat = createAsyncThunk(
    "condidats/delete",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await condidatService.deleteCondidat(id, token);
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
    "condidats/update",
    async(formData, thunkAPI) => {
        try {
            console.log(formData, "from the slice");
            return await condidatService.update(formData.id, formData);
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
export const condidatSlice = createSlice({
    name: "condidats",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCondidat.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCondidat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.condidats.push(action.payload);
            })
            .addCase(createCondidat.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCondidats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCondidats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.condidats = action.payload;
            })
            .addCase(getCondidats.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteCondidat.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCondidat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.condidats = state.condidats.filter(
                    (condidats) => condidats._id !== action.payload
                );
            })
            .addCase(deleteCondidat.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(changeStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.condidats = action.payload;
            })
            .addCase(changeStatus.rejected, (state, action) => {
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
                state.condidats = action.payload;
            })
            .addCase(getById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = condidatSlice.actions;
export default condidatSlice.reducer;