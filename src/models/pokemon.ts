export interface PokemonPage{ // interface pour stocker une page de Pokémons
    results: { name: string}[],
    next: string| null,
    previous: string|null,
}

export interface Pokemon{ //interface pour stocker les caractéristiques du Pokémon
    name: string,
    stats:{
        stat:{
            name: string,
            base_stat: number,
        }
    }[],
    types: {
        type: {
            name: string,
        }
    }[],
    moves: {
        move:{
            name: string,
        }
    }[],
    weight: number,
    height: number,
    sprites: {
        other: {
            "official-artwork": {
                front_default: string,
            }
        }
    }
}