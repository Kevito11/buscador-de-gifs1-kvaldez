import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/searchBar";
import { PreviousSearches } from "./gifs/components/previousSearches";
import { GifList } from "./gifs/components/GifList";
import { useGifs } from "./gifs/hooks/useGifs";


export const GifsApp = () => {

const {handleSearch, previousTerms, handleTermClicked, gifs} = useGifs();

    return (
        <>
            {/* Header */}
            <CustomHeader
                title="Buscador de Gifs"
                description="Descubre y comparte el Gif perfecto" />
            {/* Search */}

            <SearchBar
                placeholder="Busca lo que quieras"
                onQuery={handleSearch}
            />
            {/* Búsquedas previas */}

            <PreviousSearches
                searches={previousTerms}
                onLabelClicked={handleTermClicked}
            />

            {/* Gifs */}

            <GifList gifs={gifs} 
            />

        </>
    )

};
