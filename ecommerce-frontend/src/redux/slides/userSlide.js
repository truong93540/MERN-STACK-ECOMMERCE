import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    id: "",
    access_token: "",
    isAdmin: false,
};

export const userSlide = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name = state.name,
                email = state.email,
                access_token = state.access_token,
                address = state.address,
                phone = state.phone,
                avatar = state.avatar,
                _id = state.id,
                isAdmin = state.isAdmin,
            } = action.payload;
            state.name = name;
            state.email = email;
            state.address = address;
            state.phone = phone;
            state.avatar = avatar;
            state.id = _id;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
            state.name = "";
            state.email = "";
            state.address = "";
            state.phone = "";
            state.avatar = "";
            state.access_token = "";
            state.isAdmin = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
