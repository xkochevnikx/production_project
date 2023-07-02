import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import { PageError } from '@/widgets/PageError';

interface IErrorBoundaryProps {
    children: ReactNode;
}

interface IErrorBoundaryState {
    hasError: boolean;
}
//! компонент ловит ошибки кроме ошибок в Обработчиках событий, Асинхронном коде, Рендеринг на стороне сервера ,Ошибки, возникающие в самой границе ошибки (а не в ее дочерних элементах)
class ErrorBoundary extends React.Component<
    IErrorBoundaryProps,
    IErrorBoundaryState
> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            // You can render any custom fallback UI
            //! в саспенсе тут компонент потому что там есть переводы
            return (
                <Suspense fallback="">
                    <PageError />
                </Suspense>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
