import { createRoot } from 'react-dom/client';
import './global.css';
import MainRouter from './router.jsx';

createRoot(document.getElementById('app')).render(<MainRouter />);
