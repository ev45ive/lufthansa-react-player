import { AnyAction, applyMiddleware, combineReducers, compose, createStore, Dispatch, Middleware, MiddlewareAPI, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import counter from "./core/reducers/CouterReducer";
import playlists, { } from "./core/reducers/PlaylistsReducer";
import search from "./core/reducers/SearchReducer";
import tracks from "./core/reducers/TracksReducer";

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";
import { musicSearchSaga } from "./core/sagas/musicSearchSaga";
import { playlistsSaga } from "./core/sagas/playlistsSagas";

import tasks from './agile/reducers/agile'
import { agileSaga } from "./agile/sagas/agile";

const reducer = combineReducers({
    // counter: counter,  // Slice Reducer
    counter,
    playlists,
    search,
    tracks,
    tasks
})

export type AppState = ReturnType<typeof reducer>

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const middleware: Middleware[] = [
    sagaMiddleware,
    thunk,
    logger
];

export const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(...middleware)
));

// Then run the saga
sagaMiddleware.run(musicSearchSaga)
sagaMiddleware.run(playlistsSaga)
sagaMiddleware.run(agileSaga)
