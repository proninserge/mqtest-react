import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';

window.addEventListener('error', (err) => {
    console.warn(`Exception ${err.type}`); // here we can log uncaught exceptions
});

window.addEventListener('unhandledrejection', (err) => {
    console.warn(`Unhandled ${err.type}`); // here we can log unhandled promise rejections
});

// Didn't use UI kits for such project due to UIkit package sizes

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
