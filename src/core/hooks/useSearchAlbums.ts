import axios from 'axios';
import { useState } from 'react';
import { AlbumsSearchResponse, AlbumView } from '../../model/Search';
import { auth } from '../services';


export const useSearchAlbums = (api_url: string) => {
    const [results, setResults] = useState<AlbumView[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const searchAlbums = async (query: string) => {
        try {
            setResults([]);
            setMessage('');
            setIsLoading(true);

            const response = await axios.get<AlbumsSearchResponse>(api_url, {
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
