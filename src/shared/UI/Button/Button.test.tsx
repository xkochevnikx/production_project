import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from './Button';

// тестирую компонент на предмет навершивания класса
describe('button', () => {
    test('render button', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });
    test('add class', () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});
