import { Component, OnInit } from '@angular/core';
import { Todo } from './../../models/Todo';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

    todos!: Todo[];

    inputTodo: string = "";

    constructor() { }

    saveTodosOnLocalstorage() {
        localStorage.setItem("TODOS", JSON.stringify(this.todos));
    }

    ngOnInit(): void {
        const newTodos = JSON.parse(localStorage.getItem("TODOS") || "[]");
        this.todos = [...newTodos];
    }

    toggleDone(todoIndex: number): void {
        this.todos.map((todo, index) => {
            if (index === todoIndex) todo.completed = !todo.completed;
            return todo;
        })
        this.saveTodosOnLocalstorage();
    }

    deleteTodo(todoIndex: number): void {
        this.todos = this.todos.filter((todo, index) => index !== todoIndex);
        this.saveTodosOnLocalstorage();
    }

    addTodo() {
        if (!this.inputTodo.length) return;

        this.todos.push({
            content: this.inputTodo,
            completed: false
        })

        this.saveTodosOnLocalstorage();
        this.inputTodo = "";
    }
}
