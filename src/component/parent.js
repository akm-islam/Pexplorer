import React, {Component} from 'react';
import './parent.css';
import myData from './myfile.json';
import Tree from './Tree';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Row,Col} from 'reactstrap';
class Parent extends Component {
constructor(props){
    super(props)
    this.state={isOpen:false,all_chars:null,clicked_characteristics:[],tree_vis:null}
}
 toggle = () => {
    if(!this.state.isOpen){
        this.setState({isOpen:true})
    }
    else{
        this.setState({isOpen:false})
    }
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

createview=()=>{
    console.log(myData)
    this.setState({all_chars:myData.all_chars})
}
    componentDidMount(){
    this.createview()
  }
pclick_handler=(e,d)=>{
  this.setState({tree_vis:null})
  var clicked_characteristics=this.state.clicked_characteristics
  if(clicked_characteristics.includes(d)){
    this.classRemover(d,"clicked")
    clicked_characteristics=clicked_characteristics.filter(function(item){
      return item!=d;  
  })  
  }
  else{
    clicked_characteristics.push(d)
    this.classAdder(d,"clicked")  
  }
  this.setState({clicked_characteristics:clicked_characteristics},()=>{
    var tree_vis=<Tree data={myData} clicked_characteristics={this.state.clicked_characteristics}> </Tree>
    this.setState({tree_vis:tree_vis})
  })
}
render(){
    return (
        <div>
        <Navbar light expand="md">
          <NavbarBrand href="/">Pexplorer</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Feedback</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Sign up</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Row className="char_list_container">
            <Col className="char_list_container2">{this.state.all_chars!=null?this.state.all_chars.map((d)=>{
                return <p className="all_chars" id={d} onClick={(e)=>this.pclick_handler(e,d)}>{d}</p>
                }):null}</Col>
        </Row>
        <Row>
          <Col className="hview" xs="6" style={{height:"600px"}}>
          {this.state.tree_vis!=null?this.state.tree_vis:null}
          </Col>
          <Col className="linec" xs="6" style={{height:"600px"}}>          
          </Col>
        </Row>
      </div>
    );
  }
}
export default Parent;
