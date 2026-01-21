import { fireEvent, render, screen } from '@testing-library/react';
import { PreviousSearches } from './previousSearches';

describe('Pruebas en <PreviousSearches />', () => {

    const searches = ['Saitama', 'Goku', 'Vegeta'];
    const onLabelClickedMock = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('debe de mostrar los items por defecto', () => {

        render(<PreviousSearches searches={searches} onLabelClicked={onLabelClickedMock} />);

        expect(screen.getAllByRole('listitem').length).toBe(searches.length);
        searches.forEach(search => {
            expect(screen.getByText(search)).toBeDefined();
        });

    });

    test('debe de llamar a onLabelClicked al hacer click en un item', () => {

        render(<PreviousSearches searches={searches} onLabelClicked={onLabelClickedMock} />);

        const item = screen.getByText('Saitama');
        fireEvent.click(item);

        expect(onLabelClickedMock).toHaveBeenCalledTimes(1);
        expect(onLabelClickedMock).toHaveBeenCalledWith('Saitama');

    });

});
