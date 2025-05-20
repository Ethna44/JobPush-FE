import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	profile: {
  name: null,
  firstName: null,
  email: null,
  phoneNumber: null,
  address: [{streetNumber: null,
	streetName: null,
	city: null,
	zipCode: null
  }

  ],
} // Valeur initiale du reducer
};

export const userSlice = createSlice({
	name: "user", // Nom du reducer à exporter
	initialState,
	// Fonctions à importer dans les composants pour agir sur le reducer
	reducers: {
		// connectUser: (state, action) => {
		// 	state.value.uid = action.payload;
		// },
		// disconnectUser: (state) => {
		// 	state.value.user = null;
		
		updateEmail: (state,action) => {
     state.profile.email = action.payload;
   },
	},
});

export const {updateEmail } = userSlice.actions;
export default userSlice.reducer;
