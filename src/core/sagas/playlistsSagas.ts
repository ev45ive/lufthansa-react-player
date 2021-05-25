import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { Playlist } from '../../model/Playlist';
import { Album } from '../../model/Search';
import { fetchPlaylists, updatePlaylistDetails } from '../hooks/usePlaylists';
import { fetchAlbums } from '../hooks/useSearchAlbums';
import { playlistsError, playlistsLoad, playlistsRefresh, playlistsSelect, playlistsUpdate, PLAYLISTS_REFRESH, PLAYLISTS_SAVE } from '../reducers/PlaylistsReducer';
import { searchFailed, searchSuccess, SEARCH_START } from '../reducers/SearchReducer';


function* refreshPlaylists(action: PLAYLISTS_REFRESH) {
    try {
        const results: Playlist[] = yield call(fetchPlaylists);
        yield put(playlistsLoad(results))
    } catch (error) {
        yield put(playlistsError(error))
    }
}


function* savePlaylist(action: PLAYLISTS_SAVE) {
    try {
        const result: Playlist = yield call(updatePlaylistDetails, action.payload.draft);
        yield put(playlistsUpdate(result))
        yield put(playlistsRefresh())
        yield put(playlistsSelect(result.id))

    } catch (error) {
        yield put(playlistsError(error))
    }
}

// https://dev.to/tkudlinski/redux-saga-what-why-how-examples-51o1

// function* processBusinessForm() {
//     yield put(startForm);

//     yield take('COMPLETED_STEP_1')
//     yield call(saveStep1, payload1);

//     yield take('COMPLETED_STEP_2')
//     yield call(saveStep2, payload2);
    
//     yield put(finshedForm);
// }

// function* watchFetch() {
//     while (yield take('PLAYLISTS_SAVE')) {
//         yield call(fetchPosts) // waits for the fetchPosts task to terminate
//     }
// }

export function* playlistsSaga() {
    yield takeLatest("PLAYLISTS_REFRESH", refreshPlaylists);
    yield takeLatest("PLAYLISTS_SAVE", savePlaylist);
    // yield takeLatest("START_CREATING_PLAYLISTS_MULTISTEP_FORM", processBusinessForm);
}