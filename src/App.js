import React, { Component } from 'react';
import './App.css';
import ToDoListItem from "./ToDoListItem.js";
// import Select from 'react-select';

class App extends Component {

  state = {
    todoList: JSON.parse(localStorage.getItem("todoList")) || [],
    sortfilter: "",
  }

  addToDo = (item, callBack) => {
    this.setState(
      {
        todoList: this.state.todoList.concat(item)
      },
      () => {
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
        callBack && callBack();
      }
    )
  }

  removeToDo = (item, callBack) => {
    this.setState(
      {
        todoList: this.state.todoList.filter(x => x !== item)
      },
      () => {
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
        callBack && callBack();
      }
    )
  }

  handleSort = (event) => {
    console.log(event.target.value);
    this.setState({
      sortfilter: event.target.value,
    });
  }

  handleTodoCheck(id,check) {
    console.log(check);
		const newTodo = this.state.todoList.map((todo) => {
				if(todo.id === id){
					todo.check = check;
				}
        return todo;
    })
		this.setState({todoList: newTodo});
  }
  
  render(){

    const filterTodoList = this.state.todoList.filter((todo) => {
      let filterTask = this.state.sortfilter;
      switch(filterTask) {
        case "all":
          return todo;      
        case "complete":
          return todo.check;
        case "incomplete":
          return !todo.check;
        default:
          return todo;
      }
    })

    // const options = [
    //   {value: 'all', label: 'All'},
    //   {value: 'incomplete', label: 'Incompelete'},
    //   {value: 'complete', label: 'Complete'},
    // ];  

    return (
      <div className="App">
        <form
          className="App-form"
          onSubmit={e => {
            e.preventDefault();

            const titleElement = e.target.elements["title"];
            const descriptionElement = e.target.elements["description"];
            const resultElement = false;

            this.setState(
              {
                todoList: this.state.todoList.concat({
                  title: titleElement.value,
                  description: descriptionElement.value,
                  result: resultElement.value,
                  id: new Date(),
                }),
                sortfilter: "",
              },
              () => {
                titleElement.value = "";
                descriptionElement.value = "";
              }
            )
          }}
        >
          <div>
            <input
              id="title"
              placeholder="title"
            />
            <textarea
              id="description"
              placeholder="description"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              登録
            </button>
          </div>
        </form>
        {/* <Select options={options} onChange={this.handleSort.bind(this)}/> */}
        <select name="hoge" onChange={this.handleSort.bind(this)}>
          <option value="all">All</option>
          <option value="incomplete">Incompelete</option>
          <option value="complete">Complete</option>
        </select>
        <div>
          {
            // this.state.todoList.map(todo =>
            filterTodoList.map(todo =>
          (
            <ToDoListItem
              key={todo.title}
              title={todo.title}
              description={todo.description}
              result={todo.result}
              id={todo.id}
              onClick={()=>{
                this.removeToDo(todo);
              }}
              check={todo.check}
              onTodoCheck={this.handleTodoCheck.bind(this)}
            />
          )
          )}
        </div>
      </div>
    );
  }
}

export default App;
