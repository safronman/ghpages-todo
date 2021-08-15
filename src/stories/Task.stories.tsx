import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../features/TodolistList/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";


export default {
    title: 'TodoList/Task',
    component: Task,
} as Meta;

const changeTaskStatus = action("Change status clicked")
const changeTaskTitle = action("Change title clicked")
const removeTask = action("Remove task clicked")

const baseArg = {
    changeTaskStatus: changeTaskStatus,
    changeTaskTitle: changeTaskTitle,
    removeTask: removeTask
}

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: "1", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId",
        priority: TaskPriorities.Low, order: 0, addedDate: "", startDate: "", deadline: "", description: ""},
    todolistId: "1",
    ...baseArg
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: "2", title: "HTML", status: TaskStatuses.New, todoListId: "todolistId",
        priority: TaskPriorities.Low, order: 0, addedDate: "", startDate: "", deadline: "", description: ""},
    todolistId: "2",
    ...baseArg
};
