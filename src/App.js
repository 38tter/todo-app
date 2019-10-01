import React, { Component } from 'react';
import './App.css';
import ToDoListItem from "./ToDoListItem.js";
// import Select from 'react-select';

const CLIENT_ID = `564250750842-1qrf45e733j38pdm6gkht4khatnnrd90.apps.googleusercontent.com`;
const API_KEY = `AIzaSyBBNjX1QaPU5r_5L3Fr5oqJOtTqD59G0g8`;

let scopes = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events.readonly',
];

function makeApiCall() {
  console.log('hoge');
  // var restRequest = window.gapi.client.request({
  //     'path': '/calendar/v3/users/me/calendarList'
  // });
  // restRequest.execute(function(calendarList) {
  //   console.dir(calendarList);
  // });

  window.gapi.client.load('calendar', 'v3', function() {
      var request = window.gapi.client.calendar.calendarList.list({});
      request.execute(function(resp) {
          if(!resp.error) {
            var calendarIds = [];
            for(var i = 0; i < resp.items.length; i++) {
              calendarIds.push(resp.items[i].id);

              var req = window.gapi.client.calendar.events.list({
                calendarId: resp.items[i].id,
              });

              req.execute(function(resp) {
                if(!resp.error) {
                  // for(var j = 0; j < resp.items.length; j++) {
                  //   events.push(resp.items[j]);
                  // }
                  for(var j = 0; j < 3; j++){
                    if(resp.result.items[j]){
                      console.log(resp.result.items[j].summary);
                      // this.setState(
                      //   {
                      //     todoList: this.state.todoList.concat({
                      //       title: resp.result.items[j].summary,
                      //       description: resp.result.items[j].summary,
                      //       result: '',
                      //       id: new Date(),
                      //     }),
                      //     sortfilter: "",
                      //   },
                      //   // () => {
                      //   //   titleElement.value = "";
                      //   //   descriptionElement.value = "";
                      //   // }
                      // );
                    }
                  }
                }
              });
            }
            // console.log(calendarIds);
          }
      });
  });
}

function handleClientLoad() {
  console.log('handleClientLoad');
  // 予めAPI Consoleで設定したAPIキーを設定
  window.gapi.client.setApiKey(API_KEY);

  // すでに認証済みかの確認をする。
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  console.log('checkAuth');
  // immediateをtrueで指定することで、未認証の場合、ただちにエラーが返り、
  // handleAuthResultが呼び出される。
  window.gapi.auth.authorize({client_id: CLIENT_ID, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  console.log('handleAuthResult');
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  console.log('handleAuthClick');
  // ここで、ポップアップ画面を表示して、OAuth認証を行う。
  window.gapi.auth.authorize({client_id: CLIENT_ID, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}

class App extends Component {

  state = {
    todoList: JSON.parse(localStorage.getItem("todoList")) || [],
    sortfilter: "",
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: CLIENT_ID, //"clientID"は個人で取得する
        scope: 'email',
      }).then(() => {
        const auth = window.gapi.auth2.getAuthInstance();

        this.setState({ isSignedIn: auth.isSignedIn.get() });
      });
    });
  }

  // handleClientLoad() {
  //   // 予めAPI Consoleで設定したAPIキーを設定
  //   window.gapi.client.setApiKey(API_KEY);

  //   // すでに認証済みかの確認をする。
  //   window.setTimeout(this.checkAuth,1);
  // }

  // checkAuth() {
  //   // immediateをtrueで指定することで、未認証の場合、ただちにエラーが返り、
  //   // handleAuthResultが呼び出される。
  //   window.gapi.auth.authorize({client_id: CLIENT_ID, scope: scopes, immediate: true}, this.handleAuthResult);
  // }

  // handleAuthResult(authResult) {
  //   var authorizeButton = document.getElementById('authorize-button');
  //   if (authResult && !authResult.error) {
  //     authorizeButton.style.visibility = 'hidden';
  //     // makeApiCall();
  //   } else {
  //     authorizeButton.style.visibility = '';
  //     authorizeButton.onclick = this.handleAuthClick;
  //   }
  // }

  // handleAuthClick(event) {
  //   // ここで、ポップアップ画面を表示して、OAuth認証を行う。
  //   console.log('heke');
  //   window.gapi.auth.authorize({client_id: CLIENT_ID, scope: scopes, immediate: false}, this.handleAuthResult);
  //   return false;
  // }

  // renderAuth() {
  //   if (this.state.isSignedIn === null) {
  //     return <div>i dont know your google account</div>
  //   } else if (this.state.isSignedIn) {
  //     return <div>login with google!!</div>
  //   } else {
  //     return <div>I can not see your google account!!</div>
  //   }
  // }

  // loginWithGoogle = () => {
  //   window.gapi.auth2.getAuthInstance().signIn();
  // }

  // logoutFromGoogle = () => {
  //   window.gapi.auth2.getAuthInstance().signOut();
  // }

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
        <div>
          <button id="authorize-button" style={{visibility: 'hidden'}}>Authorize</button>
          <button onClick={handleAuthClick}>カレンダーをToDoリストに追加</button>
          {/* {this.renderAuth()}
          <button onClick={this.loginWithGoogle}>
            login with google
          </button>
          <button onClick={this.logoutFromGoogle}>
            logout from google
          </button> */}
        </div>
        {/* <div>
        {this.state.events.map(function(event){
        return(
          {event.summary} {event.start.dateTime} - {event.end.dateTime}
        )})}
        </div> */}
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
