import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@router/index';
import { detect } from '@fluent-wallet/useWallet';
import 'custom-react-scrollbar/dist/style.css';
import './index.css';

const mode = localStorage.getItem('mode') ?? 'light';
if (mode === 'dark') {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

detect().then(() => {
    ReactDOM.render(
        <React.StrictMode>
            <Router />
        </React.StrictMode>,
        document.getElementById('root'),
    );
});