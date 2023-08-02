import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

// тестирую компонент на предмет навершивания атрибута и класса
describe('avatar', () => {
    test('render avatar', async () => {
        render(<Avatar alt="кусь" />);
        expect(
            screen.findAllByAltText('кусь'),
        ).toBeInTheDocument();
        screen.debug();
    });
    test('add class', async () => {
        render(<Avatar alt="кусь" className="Krochik" />);
        expect(screen.findByAltText('кусь')).toHaveClass(
            'Krochik',
        );
    });
});
