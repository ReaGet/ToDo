export default class View {
    constructor() {
        this.root = this.getElement('#todo');

        this.header = this.createElement('div', 'todo__header');
        this.form = this.createElement('form', 'todo__form');
        this.input = this.createElement('input', 'todo__input');
        this.input.placeholder = 'ToDo...';
        this.button = this.createElement('button', 'todo__button-add');
        this.button.textContent = 'Add';

        this.form.appendChild(this.input);
        this.form.appendChild(this.button);
        this.header.appendChild(this.form);

        this.todoList = this.createElement('div', 'todo__list');

        this.footer = this.createElement('div', 'todo__footer');
        this.footer.textContent = "Фильтры";

        this.root.append(this.header);
        this.root.append(this.todoList);
        this.root.append(this.footer);
    }

    bindToAdd(handler) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (this._todoText) {
                handler(this._todoText);
                this._resetInput();
            }
        });
    }

    bindToToggle(handler) {
        this.todoList.addEventListener('change', (event) => {
            if (event.target.type == 'checkbox') {
                handler(event.target.closest('.todo__item').dataset.id);
            }
        }, true);
    }

    bindToRemove(handler) {
        this.todoList.addEventListener('click', (event) => {
            if (event.target.className.includes('todo__remove')) {
                handler(event.target.closest('.todo__item').dataset.id);
            }
        }, true);
    }

    bindToEdit(handler) {
        document.body.addEventListener('click', (event) => {
            let content = event.target;
            if (!content.className.includes('todo__content') &&
                !content.closest('.todo__content')) {
                this.hideEditableField();
                return;
            }
            
            if (!content.className.includes('editable') &&
                !content.closest('.todo__content.editable')) {
                this.hideEditableField();
                this.showEditableField(content, handler);
            } else {
            }
        });
    }

    showEditableField(content, handler) {
        content.classList.add('editable');

        let text = content.textContent;
        let input = this.createElement('input', 'todo__edit');
        let form = this.createElement('form', 'edit_form');
        content.innerHTML = '';
        input.value = text;
        form.append(input);

        content.append(form);

        input.focus();

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (input.value) {
                handler(event.target.closest('.todo__item').dataset.id, input.value);
                this.hideEditableField();
            }
        });
    }

    hideEditableField(handler) {
        let inputs = document.querySelectorAll('.todo__content.editable input');
        [...inputs].map((input) => {
            let text = input.value;
            input.closest('.todo__content').classList.remove('editable');
            input.closest('.todo__content').innerHTML = text;
        });
    }

    createElement(tag, className) {
        let element = document.createElement(tag);
        element.classList.add(className);
        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);

        return element;
    }

    render(todos) {
        this.todoList.innerHTML = '';
        let todosList = this.createElement('div');

        todos.map((todo) => {
            let todoEl = `
                <div class="todo__item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                    <div class="todo__checkbox-wrapper">
                        <input type="checkbox" id="${todo.id}" class="todo__checkbox" ${todo.completed ? 'checked' : ''}>
                        <label for="${todo.id}" class="todo__label"></label>
                    </div>
                    <div class="todo__content">${todo.text}</div>
                    <div class="todo__actions">
                        <div class="todo__remove">x</div>
                    </div>
                </div>
            `;

            todosList.insertAdjacentHTML('beforeEnd', todoEl);
        })

        this.todoList.append(...todosList.children);
    }

    get _todoText() {
        return this.input.value
    }

    _resetInput() {
        this.input.value = ''
    }
}