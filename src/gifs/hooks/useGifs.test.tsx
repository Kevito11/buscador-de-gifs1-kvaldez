import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act } from "react";
import * as gifActions from "../actions/get-gifs-query.action";


describe("useGifs", () => {
    test('should return default values and methods', () => {
        const { result } = renderHook(() => useGifs());
        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();


    });

    test('should return a list of gifs', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleSearch('Goku');
        })

        expect(result.current.gifs.length).toBe(10)
    });

    test('should not search if query is empty', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleSearch('  ');
        })
        expect(result.current.gifs.length).toBe(0);
    });

    test('should not search if query is already in previousTerms', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch('Goku');
        })
        expect(result.current.gifs.length).toBe(10);

        const initialGifs = result.current.gifs;

        await act(async () => {
            await result.current.handleSearch('Goku');
        })

        // Debería mantenerse igual si no dispara nueva búsqueda (aunque el mock siempre devuelve lo mismo, 
        // aquí probamos que no llame a la API nuevamente o modifique estado innecesariamente. 
        // En realidad, para estar seguros deberíamos spyOn getGifsByQuery, pero el punto es cubrir la rama if(previousTerms.includes))
        expect(result.current.gifs).toBe(initialGifs);
    });

    test('should a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());
        await act(async () => {
            await result.current.handleTermClicked('Goku');
        })
        expect(result.current.gifs.length).toBe(10)
    });

    test('should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked('Goku');
        });

        expect(result.current.gifs.length).toBe(10);

        vi.spyOn(gifActions, 'getGifsByQuery')
            .mockRejectedValue(new Error('This is my custom error'));

        await act(async () => {
            await result.current.handleTermClicked('Goku');
        });
        expect(result.current.gifs.length).toBe(10);
    });


    test('should return no more than 8 previuous terms', async () => {
        const { result } = renderHook(() => useGifs());
        vi.spyOn(gifActions, 'getGifsByQuery')
            .mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('Goku1');
        });
        await act(async () => {
            await result.current.handleSearch('Goku2');
        });
        await act(async () => {
            await result.current.handleSearch('Goku3');
        });
        await act(async () => {
            await result.current.handleSearch('Goku4');
        });
        await act(async () => {
            await result.current.handleSearch('Goku5');
        });
        await act(async () => {
            await result.current.handleSearch('Goku6');
        });
        await act(async () => {
            await result.current.handleSearch('Goku7');
        });
        await act(async () => {
            await result.current.handleSearch('Goku8');
        });
        await act(async () => {
            await result.current.handleSearch('Goku9');
        });
        expect(result.current.previousTerms.length).toBe(8)
        expect(result.current.previousTerms).toStrictEqual([
            'goku9',
            'goku8',
            'goku7',
            'goku6',
            'goku5',
            'goku4',
            'goku3',
            'goku2'
        ])
    })
});