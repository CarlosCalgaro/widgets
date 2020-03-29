import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { persistor, store } from 'src/store';
import Layout from 'src/components/Layout';
import { ToastContainer} from 'react-toastify';
import { PersistGate } from 'redux-persist/lib/integration/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "src/assets/css/nucleo-icons.css";
import "src/assets/scss/blk-design-system-react.scss?v=1.0.0";
import "src/assets/demo/demo.css";
import "src/assets/css/custom.css";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<h1>Carregando</h1>} persistor={persistor}>
        <ToastContainer />
        <BrowserRouter>   
          <Layout/>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();