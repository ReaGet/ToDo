export default class Model {
    constructor() {
        // this.todos = [
        //     { id: 1, text: 'Text Text', completed: true },
        //     { id: 2, text: 'Text2 Text2', completed: false },
        // ]
        this.loadTodos();
    }

    loadTodos() {
        this.todos = window.localStorage.getItem('todos');
        this.todos = this.todos ? JSON.parse(this.todos) : [];
    }

    saveTodos() {
        window.localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }

    addTodo(text) {
        const todo = {
            id: Math.random(),
            text: text,
            completed: false
        }

        this.todos.push(todo);
        this.onTodoListChanged(this.todos);
        this.saveTodos();
    }

    removeTodo(id) {
        // const todoIndex = this.todos.findIndex((todo) => todo.id == id);
        // this.todos.splice(todoIndex, 1);
        this.todos = this.todos.filter((todo) => todo.id != id);
        this.onTodoListChanged(this.todos);
        this.saveTodos();
    }

    editTodo(id, text) {
        this.todos.map((todo) => {
            if (todo.id == id) {
                todo.text = text;
            }
        });
        this.onTodoListChanged(this.todos);
        this.saveTodos();
    }

    toggleTodo(id) {
        this.todos.map((todo) => {
            if (todo.id == id) {
                todo.completed = !todo.completed;
            }
        });
        this.onTodoListChanged(this.todos);
        this.saveTodos();
    }
}