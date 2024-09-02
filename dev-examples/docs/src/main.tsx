import ReactDOM from 'react-dom/client';
import Router from '@router/index';
import { completeDetect as completeDetectConflux } from '@cfxjs/use-wallet-react/conflux';
import { completeDetect as completeDetectEthereum } from '@cfxjs/use-wallet-react/ethereum/Fluent';
import 'custom-react-scrollbar/dist/style.css';
import './index.css';

const mode = localStorage.getItem('mode') ?? 'light';
if (mode === 'dark') {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

Promise.all([completeDetectConflux(), completeDetectEthereum()]).then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(<Router />);
});

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <Router />
// );
