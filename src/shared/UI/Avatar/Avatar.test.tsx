import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

// тестирую компонент на предмет навершивания атрибута и класса
describe('avatar', () => {
    test('render avatar', () => {
        render(<Avatar alt="кусь" />);
        expect(screen.getByAltText('кусь')).toBeInTheDocument();
        screen.debug();
    });
    test('add class', () => {
        render(<Avatar alt="кусь" className="Krochik" />);
        expect(screen.getByAltText('кусь')).toHaveClass('Krochik');
    });
});
