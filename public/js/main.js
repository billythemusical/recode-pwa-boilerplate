class Todos {
  constructor() {
    this.baseurl = '/api/v1/todos';
    this.todos = [];
    this.$todos = document.querySelector('.todo-list');
    this.$form = document.querySelector('.todo-form');
  }

  /**
   * initialize
   */
  async init() {
    await this.updateTodos();

    this.$form.addEventListener('submit', async evt => {
      evt.preventDefault();
      await this.createTodo();
    });
  }

  /**
   * getTodos
   * GET
   */
  async getTodos() {
    let data = await fetch(this.baseurl);
    data = await data.json();
    this.todos = data;
    await this.renderTodos();
  }
  /**
   * createTodo
   * POST
   */
  async createTodo() {
    try {
      const newData = {
        todo: this.$form.todo.value,
        status: 'incomplete'
      };
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      };
      let data = await fetch(this.baseurl, options);
      data = await data.json();
      await this.updateTodos();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * updateTodo
   * PUT
   * @param {*} id 
   * @param {*} newData 
   */
  async updateTodo(id, newData) {
    try {
      const options = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      };
      let data = await fetch(this.baseurl + `/${id}`, options);
      data = await data.json();
      await this.updateTodos();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * deleteTodo
   * DELETE
   * @param {*} id 
   */
  async deleteTodo(id) {
    try {
      const options = {
        method: 'DELETE'
      };
      let data = await fetch(this.baseurl + `/${id}`, options);
      data = await data.json();
      this.updateTodos();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * updateTodos
   * GET & rerender()
   */
  async updateTodos() {
    await this.getTodos();
    this.renderTodos();
  }

  /**
   * DOM rendering of the todos
   */
  renderTodos() {
    this.$todos.innerHTML = '';
    this.todos.forEach(item => {
      this.$todos.innerHTML += `
        <li class="todo-item" id="${item._id}">
          <form class="todo-item__form">
            <input type="text" name="todo" value="${item.todo}">
            <select name="status">
              <option value="incomplete" ${item.status === "incomplete" ? 'selected' : ''}>incomplete</option>
              <option value="complete" ${item.status === "complete" ? 'selected' : ''}>complete</option>
            </select>
          </form>
          <button class="todo-item__delete">delete</button> | <button class="todo-item__edit">edit</button>
        </li>
      `;
    });

    // add listener to delete
    document.querySelectorAll('.todo-item').forEach(item => {
      item.addEventListener('click', this.handleEditOrDelete.bind(this));
    });
  }

  /**
   * handle the edit or delete button
   * @param {} evt 
   */
  async handleEditOrDelete(evt) {
    {
      const $clickedButton = evt.target;
      const $listItem = evt.currentTarget;

      if ($clickedButton.classList.contains('todo-item__delete')) {
        await this.deleteTodo($listItem.id);
        console.log('delete', $listItem, $listItem.id);
      } else if ($clickedButton.classList.contains('todo-item__edit')) {
        const form = $listItem.firstElementChild;

        const updatedData = {
          todo: form.todo.value,
          status: form.status.value
        };
        console.log(updatedData);
        await this.updateTodo($listItem.id, updatedData);
        console.log('edit', $listItem.id);
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const todos = new Todos();

  await todos.init();
});
