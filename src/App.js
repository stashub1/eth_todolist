import React, {Component} from 'react';
import Web3 from 'web3';
import './App.css';
import {TODO_LIST_ABI, TODO_LIST_ADDRESS} from "./config";
import TodoList from "./TodoList";


class App extends Component {


    componentWillMount() {
        this.loadBlockChainData();
    }

    constructor(props) {
       super(props);
       this.state = {
           account: "",
           taskCount: 0,
           tasks: [],
           loading: true
       }
        this.createTask = this.createTask.bind(this)
        this.toggleCompleted = this.toggleCompleted.bind(this)
    }




   async loadBlockChainData() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();

    this.setState({account: accounts[0]});
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    this.setState({todoList});
    const taskCount = await todoList.methods.taskCount().call();
    this.setState({taskCount})
    console.log("network: , " , network);
    console.log("accounts: , " , accounts);
    console.log("todoList: ", todoList);
    let tasksFromContract = [];
    for(var i = 0; i <= taskCount; i++) {
        const task = await todoList.methods.tasks(i).call();
        tasksFromContract.push(task);
      }
      this.setState({tasks: tasksFromContract});
      console.log("tasks: ", this.state.tasks);
      this.setState({loading : false});
  }

    createTask(content) {
       this.setState({loading : true});
       this.state.todoList.methods.createTask(content).send({from:this.state.account})
       .once('receipt', (receipt) => {
           console.log("receipt: " , "inside once" );
           this.state({loading : false})
      })
    }

    toggleCompleted (taskId) {
        this.setState({loading : true});
        console.log("toggleCompleted method");

        this.state.todoList.methods.toggleCompleted(taskId).send({from:this.state.account})
            .once('receipt', (receipt) => {
                console.log("toggle completed: " , "id" );
                this.state({loading : false})
            })
    }

  render() {
    return ( 
      <div className="App">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank">Dapp University | Todo List</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
          <div id="content">
              { this.state.loading
                  ? <div id="loader" className="text-center"> <p className="text-center">Loading...</p>    </div>
                  : <TodoList
                      tasks={this.state.tasks}
                      createTask={this.createTask}
                      toggleCompleted = {this.toggleCompleted}
                  />
              }
          </div>
      </div>
    );
  }
}



export default App;
