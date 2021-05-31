import * as faker from 'faker'
import * as  fs from 'fs'
console.clear()

const genUser = () => ({
    id: faker.datatype.uuid(),
    type: 'user',
    email: faker.internet.email(),
    password: faker.lorem.word(),
})

const genSprint = ({ }) => {
    const createdAt = faker.date.recent(1, new Date());
    const startAt = faker.date.soon(5, createdAt);
    const endAt = faker.date.soon(7, startAt);

    return ({
        // id: faker.datatype.number({ min: 1, max: 10 }),
        id: faker.datatype.uuid(),
        type: 'sprint',
        title: faker.company.bs(),
        createdAt: createdAt.toJSON(),
        startAt: startAt.toJSON(),
        endAt: endAt.toJSON(),
    })
}

const genTask = ({ userId, sprintId }) => ({
    id: faker.datatype.uuid(),
    userId, sprintId,
    type: 'task',
    title: faker.company.bs(),
    describe: faker.lorem.sentence(15),
    status: faker.random.arrayElement(['new', 'inprogress', 'review', 'done']),
    createdAt: faker.date.recent(1, new Date()).toJSON()
})

const genComment = ({ userId, taskId }) => ({
    id: faker.datatype.uuid(),
    type: 'comment',
    userId,
    taskId,
    content: faker.company.bs(),
    createdAt: faker.date.recent(1, new Date()).toJSON()
})


const data = {
    users: [],
    sprints: [],
    tasks: [],
    comments: [],
}



faker.datatype.array(4).forEach(() => {
    const sprint = genSprint({});
    data.sprints.push(sprint)
})

faker.datatype.array(10).forEach(() => {
    const user = genUser();
    data.users.push(user)

    faker.datatype.array(faker.datatype.number({ min: 5, max: 15 })).forEach(() => {
        const task = genTask({
            userId: user.id,
            sprintId: data.sprints[faker.datatype.number({ min: 1, max: data.sprints.length }) - 1].id
        });
        data.tasks.push(task)

        faker.datatype.array(10).forEach(() => {
            const comment = genComment({ userId: user.id, taskId: task.id });
            data.comment.push(comment)

        })
    })
})

// console.log(JSON.stringify(data))

fs.writeFileSync(__dirname + '/data.json', JSON.stringify(data, null, 2))