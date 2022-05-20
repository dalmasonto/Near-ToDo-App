import { useEffect } from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../app/store';

import Navbar from '../components/common/Navbar'
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'
import makeConnection from '../app/nearFunctions';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    makeConnection(window);
  }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navbar />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
