import { fireEvent, render, screen } from '@testing-library/react';
import { renderWithTranslation } from '../../../../shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
   test('Sidebar', () => {
      renderWithTranslation(<Sidebar />);
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
   });
   test('Sidebar toggle', () => {
      renderWithTranslation(<Sidebar />);
      const toggle = screen.getByTestId('sideToggle');
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      fireEvent.click(toggle);
      expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
   });
});
