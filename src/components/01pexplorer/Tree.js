import React, { Component } from 'react';
import * as d3 from 'd3';
import './css/tree.css';
import { group } from 'd3';

class Tree extends Component {
  constructor(props) {
  super(props);
  this.state = {level_names:["Health", "Education", "Crime"],highest:null};
  this.value=null
  this.createTree=this.createTree.bind(this)
}
//---------------------------------------------------------------------------CreateTreemap starts here
createTree(mytreedata,mywidth,myheight){
  var highest_value=0;
  var treeData=[mytreedata]
  console.log(treeData[0].children[0])
  for(var i=0;i<treeData[0].children.length;i++){
      if(parseFloat(parseFloat(treeData[0].children[i].percentage).toFixed(2))>parseFloat(parseFloat(highest_value).toFixed(2))){
        highest_value=parseFloat(parseFloat(treeData[0].children[i].percentage).toFixed(2))
      }
      console.log(treeData[0].children[i].percentage,highest_value)
  }
//console.log(highest_value)
//------------------------- Initial set ups
var margin = {top: 40, right: mywidth*.01, bottom: 0, left: mywidth*.01},
width = mywidth - margin.right - margin.left,
height = 350 - margin.top - margin.bottom;
var rectConfig={width:500,height:30,x:100,y:25}
//-----
var svg = d3.select(this.node).append("svg").attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom).attr("id","svg_container")
svg.append('rect').attr("width",rectConfig.width).attr('height',rectConfig.height).attr('x',rectConfig.x).attr('y',rectConfig.y).attr('fill','#8aa9c5')

var groups=svg.selectAll('g').append('g').data([0,1,2,3])
groups.exit().remove()
var groupsEnter=groups.enter().append("g").attr('transform',(d,i)=>'translate(' + (i*(rectConfig.width/4)+145) + ',' + rectConfig.y + ')')
groups.merge(groupsEnter)
var text=groupsEnter.append('text').text("hello").attr('y',(d,i)=>height-80)
var line= groupsEnter.append('line').attr('y1', 30).attr('y2', height-100).attr("stroke-width",5).style('stroke', '#989994');
}


prepare_and_call_create_tree=()=>{
  var traits=["Openness","Conscientiousness","Extraversion","Agreeableness","Neuroticism"]
  var data=this.props.data
  var clicked_characteristics=this.props.clicked_characteristics
  // looping start here
  var children=[]
  for(var i=0;i<traits.length;i++){
    var count=0
    var mydict={}
    var arr=[]
    var Traits=traits[i]
    for(var j=0;j<clicked_characteristics.length;j++){
      var characterstic=clicked_characteristics[j]
      //console.log(this.props.data[Traits]["High"],characterstic)
      if(this.props.data[Traits]["High"].includes(characterstic)){
        arr.push(characterstic)
        count=count+1
        //console.log(Traits,characterstic)
      }
      else if(this.props.data[Traits]["Low"].includes(characterstic)){
        arr.push(characterstic)
        count=count+1
        //console.log(Traits,characterstic)
      }
    }
    //console.log("Traits ",Traits," percentage: ",(count/clicked_characteristics.length)*100)
    var percentage=(count/clicked_characteristics.length)*100
    if(percentage>0){
      percentage=percentage.toFixed(0)
      mydict["percentage"]=percentage
      mydict["trait_name"]=Traits
      mydict["parent"]="Top Level"
      mydict["characteristics"]=arr
      children.push(mydict)  
    }
  }
  var mytreedata={"percentage":"Traits","parent":"null","children":children}
  this.createTree(mytreedata,document.getElementById('tree_root').clientWidth,document.getElementById('tree_root').clientHeight)
}
componentDidMount(){
  //console.log("Did mount")
  this.prepare_and_call_create_tree()
}
componentWillUpdate(){
return true;
}

//-----------------------------------------------------------------Render function starts here  
render() {
  return (
      <div className="tree_container">
        <div id="tree_root" ref={node => this.node = node} style={{width:'100%',height:'100%'}}></div>
      </div>  
  );
  }
}
export default Tree;

//http://www.d3noob.org/2014/01/tree-diagrams-in-d3js_11.html