import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recruterService from "./recruterService";

const initialState = {
    recruters: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new recruter
export const createRecruter = createAsyncThunk(
    "recruters/create",
    async(recruterData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await recruterService.create(recruterData, token);
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
export const getRecruters = createAsyncThunk(
    "recruters/getAll",
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await recruterService.getAll(token);
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
    "recruters/changeStatus",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await recruterService.changeStatus(id, token);
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
export const deleteRecruter = createAsyncThunk(
    "recruters/delete",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await recruterService.deleteById(id, token);
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

export const getRecruterById = createAsyncThunk(
    "recruters/getbyid",
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await recruterService.getById(id, token);
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
    "recruters/update",
    async(formData, thunkAPI) => {
        try {
            console.log(formData, "from the slice");
            return await recruterService.update(formData.id, formData);
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
export const recruterSlice = createSlice({
    name: "recruters",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecruter.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRecruter.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.recruters.push(action.payload);
            })
            .addCase(createRecruter.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getRecruters.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRecruters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.recruters = action.payload;
            })
            .addCase(getRecruters.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteRecruter.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteRecruter.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.recruters = state.recruters.filter(
                    (recruter) => recruter._id !== action.payload.id
                );
            })
            .addCase(deleteRecruter.rejected, (state, action) => {
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
                state.message = action.payload;
            })
            .addCase(changeStatus.rejected, (state, action) => {
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
                state.message = action.payload;
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getRecruterById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRecruterById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.recruters = action.payload;
            })
            .addCase(getRecruterById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = recruterSlice.actions;
export default recruterSlice.reducer;