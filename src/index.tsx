import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

const element = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(element);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
