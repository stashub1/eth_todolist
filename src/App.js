import React, {Component} from 'react';
import Web3 from 'web3';
import './App.css';
  
  

class App extends Component {

   constructor(props) {
    super(props);
    this.state = { account: ""};

  }

  componentWillMount() {
    this.loadBlockChainData();
  }

  async loadBlockChainData() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();

    this.setState({account: accounts[0]});

    console.log("network: , " , network);
    console.log("accounts: , " , accounts);
  }

  render() {
    return ( 
      <div className="App">
       <div className="container">
        <h2>Hello world</h2>
        <p> Your accounts is : {this.state.account}</p>
       </div>
      </div>
    );
  }
}



export default App;
