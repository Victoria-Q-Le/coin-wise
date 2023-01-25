import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Container } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>
);

