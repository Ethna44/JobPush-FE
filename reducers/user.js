import { createSlice } from "@reduxjs/toolkit";
import Applications from "../components/Applications";

const initialState = {
	token: null, // Valeur initiale du token
	profile: {
  name: null,
  firstName: null,
  email: null,
  phoneNumber: null,
  address: [{streetNumber: null,
	streetName: null,
	city: null,
	zipCode: null
    }],
  preferences: [{
	 contractType: null,
    remote:null,
    jobTitle:null,
    sector:null,
    cityJob:null,
    region:null,
  }],
  alerts: null,
  favorites: [],
  applications: [],


  
}
};

export const userSlice = createSlice({
	name: "user", // Nom du reducer à exporter
	initialState,
	// Fonctions à importer dans les composants pour agir sur le reducer
	reducers: {
		updateUser: (state, action) => {
			state.profile = action.payload;
		},

		updateToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const {updateUser,updateToken } = userSlice.actions;
export default userSlice.reducer;
