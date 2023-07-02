import App from '@/app/App';
import './app/styles/index.scss';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/app/providers/StoreProviders';

//! импортируем конфиг переводов
import './shared/config/i18n/i18n';

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
if (!container) {
    throw new Error('контейнер root не найден');
}
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
