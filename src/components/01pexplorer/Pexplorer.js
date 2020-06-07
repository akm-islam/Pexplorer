import React, {Component} from 'react';
import './css/pexplorer.css';
import "./css/popovers.css"
import myData from './myfile.json';
import Tree from './Tree';
import Mychart from "./Mychart"
import { Slider } from '@material-ui/core';
import {Row, Col} from 'reactstrap';
class Parent extends Component {
constructor(props){
    super(props)
    this.state={all_chars:null,clicked_characteristics:[],tree_vis:null,dict_of_charactersitics:{},isOpen:false}
    this.target="id1";
  }
// Class Adder (is is the id to find the element and class_name is the class to add)
classAdder = (id,class_name)=>{
  var element = document.getElementById(id);
  //element.style.fill = 'blue';
  element.classList.add(class_name);
  }
  // Class Remover
  classRemover = (id,class_name)=>{
    var element = document.getElementById(id);
    element.classList.remove(class_name);
  }

pclick_handler=(e,d,def_value)=>{
  this.setState({tree_vis:null})
  var temp_dict=this.state.dict_of_charactersitics;
  var clicked_characteristics=this.state.clicked_characteristics
  if(clicked_characteristics.includes(d)){
    this.classRemover(d,"clicked")
    delete temp_dict[d];
    clicked_characteristics=clicked_characteristics.filter(function(item){
      return item!=d;  
  })  
  }
  else{
    clicked_characteristics.push(d)
    temp_dict[d]=def_value
    this.classAdder(d,"clicked")  
  }
  //------
  this.setState({dict_of_charactersitics:temp_dict})
  //-------
  this.setState({clicked_characteristics:clicked_characteristics},()=>{
    var tree_vis=<Tree data={myData} clicked_characteristics={this.state.clicked_characteristics}> </Tree>
    this.setState({tree_vis:tree_vis})
  })
}
//---------------
handleonChangeCommitted = (e,new_value,d) => {
  var temp_dict=this.state.dict_of_charactersitics;
  temp_dict[d]=new_value;
  this.setState({dict_of_charactersitics:temp_dict})
}
shuffle=(array)=> {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
createview=()=>{
  var all_chars=this.shuffle(myData.all_chars)
  this.setState({all_chars:all_chars})
}
componentDidMount(){
  var mydict={}
  for(var i=0;i<myData.all_chars.length;i++){
    var x = Math.floor((Math.random() * 80) + 20);
    mydict[myData.all_chars[i]]=x
  }
  this.createview()
  }
  toggle = () => {
    var temp=this.state.isOpen
    this.setState({isOpen:!temp})
}
//-----------------------------Rendering starts here
render(){
    return (
    <div className="pexplorer">
        <Row className="char_list_container">
            {this.state.all_chars!=null?this.state.all_chars.map((d)=>{
                var def_value=Math.floor((Math.random() * 90) + 10);
                return <Row id={d} id={d} style={{height:40}}>
                <p onClick={(e)=>this.pclick_handler(e,d,def_value)}>{d}</p>
                {this.state.clicked_characteristics.includes(d)?<Slider valueLabelDisplay="auto" orientation="horizontal" defaultValue={0} 
                onChange={(e,value)=>this.handleonChangeCommitted(e,value,d)}>
                </Slider>:null}
                </Row>
            }):null}
        </Row>
        <Row className="tree_and_linechart">
          <Col className="treemap" xs="12" sm='12' md='12' lg="6">
          <Tree data={myData} clicked_characteristics={this.state.clicked_characteristics}> </Tree>
          </Col>
          <Col id='chartcontainer' className="linechart" xs="12" sm='12' md='12' lg="6">
            <Mychart data={this.state.dict_of_charactersitics}></Mychart>
          </Col>
        </Row>
    </div>
    );
  }
}
export default Parent;

//https://www.npmjs.com/package/react-rangeslider
//onClick={(e)=>this.pclick_handler(e,d)}