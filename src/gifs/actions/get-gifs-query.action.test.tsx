import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-query.action";
import { giphySearchResponseMock } from "../../../tests/mock/giphy.response.data";

import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api/giphy.api";


describe('getGifsQuery', () => {
    let mock = new AxiosMockAdapter(giphyApi);
    beforeEach(() => {
        // mock.reset();
        mock = new AxiosMockAdapter(giphyApi);
    });

    //     test('should return a list of gifs', async() => {
    //         const gifs = await getGifsByQuery('goku');
    //         const[gif1] = gifs;

    //         expect(gif1).toEqual({
    //             id: expect.any(String),
    //             title: expect.any(String),
    //             url: expect.any(String),
    //             width: expect.any(Number),
    //             height: expect.any(Number),
    //         });

    // });



    test('should return a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock);

        const gifs = await getGifsByQuery('goku');

        expect(gifs.length).toBe(10);
        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');

        });
    });


    test('should return an empty list of gifs if query is empty', async () => {
        // mock.onGet('/search').reply(200, giphySearchResponseMock);

        const gifs = await getGifsByQuery('');

        expect(gifs.length).toBe(0);
    });

    test('should handle error when API return an error fails', async () => {

        const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => { });

        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request',
            },
        });

        const gif = await getGifsByQuery('goku')
        expect(gif.length).toBe(0);
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());


    });

}); 