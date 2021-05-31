"use strict";
exports.__esModule = true;
var faker = require("faker");
var fs = require("fs");
console.clear();
var genUser = function () { return ({
    id: faker.datatype.uuid(),
    type: 'user',
    email: faker.internet.email(),
    password: faker.lorem.word()
}); };
var genSprint = function (_a) {
    var createdAt = faker.date.recent(1, new Date());
    var startAt = faker.date.soon(5, createdAt);
    var endAt = faker.date.soon(7, startAt);
    return ({
        // id: faker.datatype.number({ min: 1, max: 10 }),
        id: faker.datatype.uuid(),
        type: 'sprint',
        title: faker.company.bs(),
        createdAt: createdAt.toJSON(),
        startAt: startAt.toJSON(),
        endAt: endAt.toJSON()
    });
};
var genTask = function (_a) {
    var userId = _a.userId, sprintId = _a.sprintId;
    return ({
        id: faker.datatype.uuid(),
        userId: userId, sprintId: sprintId,
        type: 'task',
        title: faker.company.bs(),
        describe: faker.lorem.sentence(15),
        status: faker.random.arrayElement(['new', 'inprogress', 'review', 'done']),
        createdAt: faker.date.recent(1, new Date()).toJSON()
    });
};
var genComment = function (_a) {
    var userId = _a.userId, taskId = _a.taskId;
    return ({
        id: faker.datatype.uuid(),
        type: 'comment',
        userId: userId,
        taskId: taskId,
        content: faker.company.bs(),
        createdAt: faker.date.recent(1, new Date()).toJSON()
    });
};
var data = {
    users: [],
    sprints: [],
    tasks: [],
    comment: []
};
faker.datatype.array(4).forEach(function () {
    var sprint = genSprint({});
    data.sprints.push(sprint);
});
faker.datatype.array(10).forEach(function () {
    var user = genUser();
    data.users.push(user);
    faker.datatype.array(faker.datatype.number({ min: 5, max: 15 })).forEach(function () {
        var task = genTask({
            userId: user.id,
            sprintId: data.sprints[faker.datatype.number({ min: 1, max: data.sprints.length }) - 1].id
        });
        data.tasks.push(task);
        faker.datatype.array(10).forEach(function () {
            var comment = genComment({ userId: user.id, taskId: task.id });
            data.comment.push(comment);
        });
    });
});
// console.log(JSON.stringify(data))
fs.writeFileSync(__dirname + '/data.json', JSON.stringify(data, null, 2));
