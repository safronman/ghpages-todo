import {addTodolistAC, TodolistDomainType, todolistsReducer} from "../features/TodolistList/todolists-reducer";
import {tasksReducer, TasksStateType} from "../features/TodolistList/tasks-reducer";
import {TodolistType} from "../api/todolists-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodolistDomainType> = [];

    const todolist: TodolistType = {
        id: 'dwefrvevr',
        order: 0,
        title: 'new todolist',
        addedDate: ''
    };
    let action = addTodolistAC(todolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodoLists).toBe(action.todolist.id);
});