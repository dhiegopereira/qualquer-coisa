import 'dotenv';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import history from './services/history';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'video-react/dist/video-react.css';

function App() {
  return (
    <BrowserRouter>
      <Routes history={history} />
      <ToastContainer newestOnTop={false} rtl={false} pauseOnVisibilityChange />
    </BrowserRouter>
  );
}

export default App;
