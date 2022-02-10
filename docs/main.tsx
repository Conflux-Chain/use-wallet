import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@router/index';
import 'custom-react-scrollbar/dist/style.css';
import './index.css';
// import { completeDetect } from '@cfxjs/use-wallet';
// import { completeDetect as completeDetectEthereum } from '@cfxjs/use-wallet/dist/ethereum';

const mode = localStorage.getItem('mode') ?? 'light';
if (mode === 'dark') {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

ReactDOM.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
    document.getElementById('root'),
);

// Promise.all([completeDetect(), completeDetectEthereum()]).then(() => {
//     ReactDOM.render(
//         <React.StrictMode>
//             <Router />
//         </React.StrictMode>,
//         document.getElementById('root'),
//     );
// });