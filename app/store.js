
import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
import appreducer from '../reducers/appreducer';
import storage from './storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app']
}

const rootReducer = combineReducers(
  {
    // user: userSlice,
    app: appreducer
  }
)

const persistReducer_ = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistReducer_,
);

// const store_ = configureStore();

const persistor = persistStore(store);
export { store, persistor }
