import {
    addTaskAC,
    setTasksAC,
    tasksReducer,
    TasksStateType,
    updateTaskAC
} from '../features/TodolistList/tasks-reducer';
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistAC} from "../features/TodolistList/todolists-reducer";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: "todolistId",
                priority: TaskPriorities.Low, order: 0, addedDate: "", startDate: "", deadline: "", description: ""
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New,  todoListId: "todolistId",
                priority: TaskPriorities.Low, order: 0, addedDate: "", startDate: "", deadline: "", description: ""
            },
            {
                id: v1(), title: "React", status: TaskStatuses.New,  todoListId: "todolistId",
                priority: TaskPriorities.Low, order: 0, addedDate: "", startDate: "", deadline: "", description: ""
            }
        ],
        "todolistId2": [
            {
                id: v1(), title: "bread", status: TaskStatuses.New,  todoListId: "todolistId",
                priority: TaskPriorities.Low, order: 0, addedDate: "", startDate: "", deadline: "", description: ""
            },
            {
                id: v1(), title: "milk", status: TaskStatuses.New,  todoListId: "todolistId",
                priority: TaskPriorities.Low, order: 0, addedDate: "", startDate: "", deadline: "", description: ""
            },
            {
                id: v1(), title: "tea", status: TaskStatuses.New,  todoListId: "todolistId",
                priority: TaskPriorities.Low, order: 0, addedDate: "", startDate: "", deadline: "", description: ""
            }
        ]
    };
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        todoListId: "todolistId2",
        title: "juce",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "id exists"
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('title of specified task should be changed', () => {

    const action = updateTaskAC("2", {
        status: TaskStatuses.New,
        title: "milk",
        priority: 0,
        startDate: "",
        description: "",
        deadline: ""
    }, "todolistId2");
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId2'][1].title).toBe("milk");
    expect(endState['todolistId1'][1].title).toBe("JS")
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: 'dwefrvevr',
        order: 0,
        title: 'new todolist',
        addedDate: ''
    });
    const endState = tasksReducer(startState, action)

    //const keys1 = Object.keys(startState)//["todolistId1", "todolistId2"]
    const keys = Object.keys(endState);

    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});
test('empty arrays should be added when set todolist', () => {
    const action = setTodolistAC([
        {id: "1", title: "title 1", addedDate: "", order: 0},
        {id: "2", title: "title 2", addedDate: "", order: 1}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])
})
test('tasks should be added for todolist', () => {
    const action = setTasksAC(startState["todolistId1"], "todolistId1")

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(0)
})
