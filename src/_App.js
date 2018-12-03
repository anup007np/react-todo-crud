import React, { Component } from 'react';
import './App.css';
import { TodoForm, TodoList } from './components/todo/'
import {addTodo, generateId} from './lib/todoHelpers'

class App extends Component {
  // eslint-disable-next-line
  constructor() {
      super()
      this.state = {
        todos: [
          {id: 1, name: 'Learn Jsx', isComplete: true},
          {id: 2, name: 'Build an Awesome App', isComplete: false},
          {id: 3, name: 'Ship It', isComplete: false}
        ],
        currentTodo: ''
      }
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleEmptySubmit = this.handleEmptySubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const newId = generateId()
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
        todos: updatedTodos,
        currentTodo: '',
        errorMessage: ''
    })
  }

  handleEmptySubmit(e) {
      e.preventDefault()
      this.setState({
          errorMessage: 'Please supply the todo name'
    })
  }

  handleInputChange(e) {
    this.setState({
        currentTodo: e.target.value
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="App">
        <h2>React Todos</h2>
        <div className="todo-app">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          <TodoForm handleInputChange={this.handleInputChange} currentTodo={this.state.currentTodo} handleSubmit={submitHandler} />
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
