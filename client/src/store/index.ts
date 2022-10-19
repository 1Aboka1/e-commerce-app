import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import authSlice from "./slices/auth"
import shoppingSessionSlice from './slices/shopsession'

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    shopping_session: shoppingSessionSlice.reducer,
})

const persistedReducer = persistReducer(
    {
	key: 'root',
	version: 1,
	storage: storage,
    },
    rootReducer
)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
	serializableCheck: {
	    ignoredActions: [FLUSH, PAUSE, REHYDRATE, PERSIST, PURGE, REGISTER]
	}
    }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof rootReducer>
export default store
