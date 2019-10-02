import React, { Component } from 'react';
import './App.css';
import ToDoListItem from "./ToDoListItem.js";

const CLIENT_ID = `564250750842-1qrf45e733j38pdm6gkht4khatnnrd90.apps.googleusercontent.com`;
const GET_DEPTH = 5; //Google カレンダーからの取得時、各カレンダーから取得する件数

let scopes = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events.readonly',
];

class App extends Component {

  state = {
    todoList: JSON.parse(localStorage.getItem("todoList")) || [],
    sortfilter: "",
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'email',
      }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: auth.isSignedIn.get() });
      });
    });
  }

  setStateDum = (hoge) => this.setState(hoge);

  // APIをコールし、Google カレンダーの予定を取得
  makeApiCall() {
    let my = this;
    window.gapi.client.load('calendar', 'v3', function() {
        let request = window.gapi.client.calendar.calendarList.list({});
        request.execute(function(resp) {
            if(!resp.error) {
              for(var i = 0; i < resp.items.length; i++) {  
                var req = window.gapi.client.calendar.events.list({
                  calendarId: resp.items[i].id,
                });
                req.execute(function(res) {
                  if(!res.error) {
                    for(var j = 0; j < GET_DEPTH; j++){
                      if(res.result.items[j]){
                        let idDas = new Date();
                        my.setState(
                          {
                            todoList: my.state.todoList.concat({
                              description: res.result.items[j].summary,
                              result: '',
                              id: idDas,
                            }),
                            sortfilter: "",
                          },
                        );
                      }
                    }
                  }
                });
              }
            }
        });
    });
  }

  checkAuth = () => {
    window.gapi.auth.authorize({client_id: CLIENT_ID, scope: scopes, immediate: true}, this.handleAuthResult);
  }
  
  handleAuthResult = (authResult) => {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
      this.makeApiCall();
    } else {
      authorizeButton.onclick = this.handleAuthClick;
    }
  }
  
  // OAuth認証
  handleAuthClick = (event) => {
    console.log('handleAuthClick');
    window.gapi.auth.authorize({client_id: CLIENT_ID, scope: scopes, immediate: false}, this.handleAuthResult);
    return false;
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

    return (
      <div className="App">
        <p>Simple Todo app</p>
        <form
          style={{margin: 'auto'}}
          className="App-form"
          onSubmit={e => {
            e.preventDefault();
            const descriptionElement = e.target.elements["description"];
            const resultElement = false;

            this.setState(
              {
                todoList: this.state.todoList.concat({
                  description: descriptionElement.value,
                  result: resultElement.value,
                  id: new Date(),
                }),
                sortfilter: "",
              },
              () => {
                descriptionElement.value = "";
              }
            )
          }}
        >
          <div>
            <textarea
              id="description"
              placeholder="description"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              add
            </button>
          </div>
        </form>
        <div>
          <button onClick={this.handleAuthClick}>Import from Google calendar</button>
        </div>
        <select name="hoge" onChange={this.handleSort.bind(this)}>
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Completed</option>
        </select>
        <div>
          {
            filterTodoList.map(todo =>
          (
            <ToDoListItem
              key={todo.description}
              // title={todo.title}
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
