const { createSlice } = require('@reduxjs/toolkit');

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currencySymbol: "$",
        currencyName: "USD",
        currencyRate: 1
    },
    reducers: {
        // Remove the setCurrency reducer if it's not needed
        setCurrency(state, action) {
            // No operation, since we only use one currency
        }
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
