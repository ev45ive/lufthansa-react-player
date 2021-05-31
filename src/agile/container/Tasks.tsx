import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store'
import { selectTasks, tracksSearchStart } from '../reducers/agile'
import { Task } from '../Task'

interface Props {

}

export const Tasks = (props: Props) => {
    const dispatch = useDispatch()
    const tasks = useSelector(selectTasks)

    useEffect(() => {
        dispatch(tracksSearchStart(''))
    }, [])

    return (
        <div>
            <table className="table w-100">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.status}</td>
                        <td>{task.createdAt}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}
