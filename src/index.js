import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './main.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query"


//🥕React query instance
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
// RENDER APP
root.render(
    <React.StrictMode>
        <QueryClientProvider client = {queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);

