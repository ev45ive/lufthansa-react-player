import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Album, AlbumsSearchResponse, AlbumView, Artist, ArtistsSearchResponse, SearchResponse } from '../../model/Search';
import { auth } from '../services';


export const useSearchAlbums = () => {
    const [results, setResults] = useState<AlbumView[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const searchAlbums = async (query: string) => {
        try {
            setResults([]);
            setMessage('');
            setIsLoading(true);

            const response = await axios.get<AlbumsSearchResponse>('https://api.spotify.com/v1/search', {
                headers: { Authorization: 'Bearer ' + auth.token },
                params: { q: query, type: 'album' },
            });

            setResults(response.data.albums.items);
        }
        catch (error) { setMessage(error.message); }
        finally { setIsLoading(false); }
    };

    return {
        searchAlbums,
        isLoading,
        message,
        results
    };
};

export const fetchArtists = (query: string) => {
    const response = axios.get<ArtistsSearchResponse>('https://api.spotify.com/v1/search', {
        params: { q: query, type: 'artist' },
    });

    return response.then(response => response.data.artists.items)
}

export const fetchAlbums = (query: string) => {
    const response = axios.get<AlbumsSearchResponse>('https://api.spotify.com/v1/search', {
        params: { q: query, type: 'album' },
    });

    return (response.then(response => response.data.albums.items))
}
  