
// 

import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { Album, Track } from '../../model/Search';
import { SEARCH_TASKS_START, tracksLoad } from '../reducers/agile';
import { Task } from '../Task';

import { normalize, schema } from 'normalizr';


// Define a users schema
const user = new schema.Entity('users');
const sprint = new schema.Entity('sprints', {
    // tasks: [task]
});

// Define your comments schema
const comment = new schema.Entity('comments', {
    user: user
});

// Define your article
const task = new schema.Entity<Task>('tasks', {
    user: user,
    sprint: sprint,
    comments: [comment]
});

export const tasksSchema = new schema.Array(task)


async function fetchTasks(query: string) {
    const { data } = await axios.get('http://localhost:9000/tasks?_expand=sprint&_expand=user&q=' + query)
    return data;
}



function* searchTasks(action: SEARCH_TASKS_START) {
    try {
        const results: Task[] = yield call(fetchTasks, action.payload.query);

        const normalizedData = normalize(results, [task]);

        debugger;


        yield put(tracksLoad(normalizedData as any))
    } catch (error) {
        // yield put(searchFailed(error))
    }
}

export function* agileSaga() {
    yield takeLatest("SEARCH_TASKS_START", searchTasks);
}