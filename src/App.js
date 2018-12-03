import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import { TodoForm, TodoList, Footer } from './components/todo/'
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers'
import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/todoService'

class App extends Component {
  state = {
      todos: [],
      currentTodo: ''
  }

  static contextTypes = {
      route: PropTypes.string
  }

  componentDidMount() {
      loadTodos()
        .then(todos => this.setState({todos}))
  }

  handleSubmit = (e) => {
      e.preventDefault()
      const newId = generateId()
      const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
      const updatedTodos = addTodo(this.state.todos, newTodo)
      this.setState({
          todos: updatedTodos,
          currentTodo: '',
          errorMessage: ''
      })
      createTodo(newTodo)
        .then(() => this.showTempMessage('Todo added'))
  }

  handleEmptySubmit = (e) => {
      e.preventDefault()
      this.setState({
          errorMessage: 'Please supply the todo name'
    })
  }

  showTempMessage = (msg) => {
      this.setState({message: msg})
      setTimeout(() => this.setState({message: ''}), 2500)
  }

  handleInputChange = (e) => {
      this.setState({
          currentTodo: e.target.value
      })
  }

  handleToggle = (id) => {
      const todo = findById(id, this.state.todos)
      const toggled = toggleTodo(todo)
      const updatedTodos = updateTodo(this.state.todos, toggled)
      this.setState({
          todos: updatedTodos
      })
      saveTodo(toggled)
        .then(() => this.showTempMessage('Todo Updated'))
  }

  handleRemove = (id, evt) => {
      evt.preventDefault()
      const updatedTodos = removeTodo(this.state.todos, id)
      this.setState({
          todos: updatedTodos
      })
      destroyTodo(id)
        .then(() => this.showTempMessage('Todo deleted'))
  }

  render() {
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="App">
        <h2>React Todos</h2>
        <div className="todo-app">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          {this.state.message && <span className='success'>{this.state.message}</span>}
          <TodoForm handleInputChange={this.handleInputChange} currentTodo={this.state.currentTodo} handleSubmit={submitHandler} />
          <TodoList handleToggle={this.handleToggle} handleRemove={this.handleRemove} todos={displayTodos} />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
