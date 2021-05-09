import { Track } from "./Search";

export interface Playlist {
    id: string;
    name: string;
    public: boolean;
    description: string;
    tracks?: Pick<Track, 'id' | 'name'>[]
}

// type Partial<T> = {
//     [k in keyof T]?: T[k]
// }

// type Pick<T, K extends keyof T> = {
//     [k in K]: T[k]
// }
