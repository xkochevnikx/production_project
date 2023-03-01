import App from 'app/App';
import './app/styles/index.scss';

import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './shared/config/i18n/i18n';
import { StoreProvider } from 'app/providers/StoreProviders';

render(
    <StoreProvider>
        <BrowserRouter>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StoreProvider>,
    document.getElementById('root'),
);
