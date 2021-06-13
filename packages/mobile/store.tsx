import { configureStore } from "@reduxjs/toolkit";

import routeReducer from "./redux/routes";
import authenticationReducer from "./redux/auth";

const store = configureStore({
  reducer: {
    navigation: routeReducer,
    auth: authenticationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
