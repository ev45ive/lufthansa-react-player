import { denormalize } from "normalizr";
import { Reducer } from "redux";
import { TracksState } from "../../core/reducers/TracksReducer";
import { AppState } from "../../store";
import { tasksSchema } from "../sagas/agile";
import { Task } from "../Task";



export interface TasksState {
    lists: {
        tasks: Task['id'][]
    },
    entities: {
        users: { [key: string]: Task },
        tasks: { [key: string]: Task },
        sprints: { [key: string]: Task },
    }
    selectedTrackId?: Task['id']
}

export type SEARCH_TASKS_START = {
    type: 'SEARCH_TASKS_START'; payload: { query: string; };
};
type TASKS_LOAD = {
    type: 'TASKS_LOAD'; payload: { entities: TasksState['entities'], result: TasksState['lists']['tasks'] };
};
type TASKS_SELECT = {
    type: 'TRACKS_SELECT'; payload: { id: Task['id']; };
};
type TRACKS_UPDATE = {
    type: 'TRACKS_UPDATE'; payload: { draft: Task; };
};


type Actions =
    | SEARCH_TASKS_START
    | TASKS_LOAD
    | TASKS_SELECT

const initialState: TasksState = {
    lists: {
        tasks: []
    },
    entities: {
        sprints: {},
        tasks: {},
        users: {},
    }
}

/* Reducer */
const reducer: Reducer<TasksState, Actions> = (
    state = initialState,
    action
): TasksState => {
    switch (action.type) {
        case 'TASKS_LOAD': {
            return {
                ...state,
                entities: {
                    ...state.entities,
                    users: {
                        ...state.entities.users,
                        ...action.payload.entities.users
                    },
                    sprints: {
                        ...state.entities.sprints,
                        ...action.payload.entities.sprints
                    },
                    tasks: {
                        ...state.entities.tasks,
                        ...action.payload.entities.tasks
                    }
                },
                lists: {
                    ...state.lists,
                    tasks: action.payload.result
                }
            }
        }
        default: return state
    }
}
export default reducer as () => TasksState

export const tracksLoad = (payload: {
    entities: TasksState['entities'],
    result: TasksState['lists']['tasks']
}): TASKS_LOAD => ({
    type: 'TASKS_LOAD', payload
})

export const tracksSearchStart = (query: string): SEARCH_TASKS_START => ({
    type: 'SEARCH_TASKS_START', payload: { query }
})

export const tracksUpdate = (draft: Task): TRACKS_UPDATE => ({
    type: 'TRACKS_UPDATE', payload: { draft }
})

/* Selectors */
// export const selectTasks = (state: AppState) => {
//     return state.tasks.lists.tasks.map(id => state.tasks.entities.tasks[id])
// }

export const selectTasks = (state: AppState) => {
    // return state.tasks.lists.tasks.map(id => state.tasks.entities.tasks[id])
    
    const result = denormalize({ tasks: state.tasks.lists.tasks }, { tasks: tasksSchema }, state.tasks.entities)
    return result.tasks as Task[]
}

export const selectTask = (state: AppState) => {
    return state.playlists.items.find(p => p.id == state.playlists.selectedId)
}
