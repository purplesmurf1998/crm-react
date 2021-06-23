import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);

export default store;

// import { configureStore } from '@reduxjs/toolkit'
// import layoutReducer from '../slices/layoutSlice'
// import sidebarReducer from '../slices/sidebarSlice'
// import themeReducer from '../slices/themeSlice'

// export default configureStore({
//   reducer: {
//     layout: layoutReducer,
//     sidebar: sidebarReducer,
//     theme: themeReducer
//   },
// })
