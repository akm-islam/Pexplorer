import React,{Component} from 'react';
import './App.css';
import Parent from './component/parent'
class App extends Component {
  componentDidMount(){}
  render(){
    return (
      <div className="App">
      <Parent></Parent>
      </div>
    );
  }
  
}

export default App;
