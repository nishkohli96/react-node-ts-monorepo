import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface GetBankInfoPayload {
	ifsc: string;
}

export const fetchBankInfo = createAsyncThunk(
	'bank/fetchBankInfo',
	async (payload: GetBankInfoPayload) => {
		const response = await axios.get(
			`https://ifsc.razorpay.com/${payload.ifsc}`
		);
		return response.data;
	}
);

export const bankInfoSlice = createSlice({
	name: 'bank',
	initialState: {
		bankInfo: {},
	},
	reducers: {},
	extraReducers(builder) {
		/*  Cases to handle for Pending, Resolved or Rejected state of
            a Promise */
		builder
			.addCase(fetchBankInfo.pending, () => {
				console.log('fetching');
			})
			.addCase(fetchBankInfo.fulfilled, (state, action) => {
				console.log('succeeded');
				state.bankInfo = action.payload;
			})
			.addCase(fetchBankInfo.rejected, () => {
				console.log('failed');
			});
	},
});

export default bankInfoSlice.reducer;
