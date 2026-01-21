import { render, screen } from '@testing-library/react';
import { GifList } from './GifList';

const gifs = [
    {
        id: '1',
        title: 'Saitama',
        url: 'https://one-punch.com/saitama.jpg',
        width: 100,
        height: 100,
    },
    {
        id: '2',
        title: 'Goku',
        url: 'https://dragon-ball.com/goku.jpg',
        width: 100,
        height: 100,
    }
];

describe('Pruebas en <GifList />', () => {

    test('debe de mostrar los items cuando se cargan imágenes', () => {

        render(<GifList gifs={gifs} />);

        expect(screen.getAllByRole('img').length).toBe(2);
        expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(2);

    });

    test('debe match con el snapshot', () => {
        const { container } = render(<GifList gifs={gifs} />);
        expect(container).toMatchSnapshot();
    });

});
