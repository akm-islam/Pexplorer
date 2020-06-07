import React, { Component } from 'react';
import * as d3 from 'd3';
import './css/tree.css';
import { group, schemeGnBu } from 'd3';
class Tree extends Component {
  constructor(props) {
  super(props);
  this.state = {level_names:["Health", "Education", "Crime"],highest:null};
  this.value=null
}
//---------------------------------------------------------------------------CreateTreemap starts here
createTree=(mytreedata,mywidth)=>{
  var highest_value=0
  console.log(highest_value)
  var dominant='';
  mytreedata.filter(item=>{
    if(highest_value<parseFloat(item.percentage)){
      highest_value=parseFloat(item.percentage)
      dominant=item.trait_name
    }
  })
  console.log(mytreedata,highest_value,dominant)
//------------------------- Initial set ups
var margin = {top: 40, right: mywidth*.01, bottom: 0, left: mywidth*.01},
width = mywidth - margin.right - margin.left,
height = 350 - margin.top - margin.bottom;
var rectConfig={width:500,height:30,x:100,y:25}
//-----
var svg = d3.select("#tree_root").data([0])
svg.exit().remove()
var svgEnter=svg.enter().append("svg")
svgEnter.attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom).attr("id","svg_container")
svg.append('rect').attr("width",rectConfig.width).attr('height',rectConfig.height).attr('x',rectConfig.x).attr('y',rectConfig.y).attr('fill','#8aa9c5')

var groups=svg.selectAll('g').data(mytreedata)
groups.exit().remove()
var groupsEnter=groups.enter().append("g")
groupsEnter.merge(groups).attr('transform',(d,i)=>'translate(' + (i*(rectConfig.width/4)+145) + ',' + rectConfig.y + ')')

groupsEnter.append('text')
.text(d=>{
  console.log(d.percentage)
  return d.percentage
})
.merge(groupsEnter.select('text'))
.text(d=>{
  console.log(d.percentage)
  return d.percentage
})
.attr('x',-15).attr('y',(d,i)=>height-80)
groupsEnter.append('line').merge(groupsEnter.select('circle')).attr('y1', 30).attr('y2', height-100).attr("stroke-width",5).style('stroke', '#989994');
}
//------------------------------------------------------------------------------------------------------------
prepare_and_call_create_tree=()=>{
  var traits=["Openness","Conscientiousness","Extraversion","Agreeableness","Neuroticism"]
  var data=this.props.data
  var clicked_characteristics=this.props.clicked_characteristics
  // looping start here
  var mytreedata=[]
  for(var i=0;i<traits.length;i++){
    var count=0
    var mydict={}
    var arr=[]
    var Traits=traits[i]
    for(var j=0;j<clicked_characteristics.length;j++){
      var characterstic=clicked_characteristics[j]
      if(this.props.data[Traits]["High"].includes(characterstic)){
        arr.push(characterstic)
        count=count+1
      }
      else if(this.props.data[Traits]["Low"].includes(characterstic)){
        arr.push(characterstic)
        count=count+1
      }
    }
    var percentage=(count/clicked_characteristics.length)*100
    if(percentage>0){
      percentage=percentage.toFixed(0)
      mydict["percentage"]=percentage
      mydict["trait_name"]=Traits
      mydict["parent"]="Top Level"
      mydict["characteristics"]=arr
      mytreedata.push(mydict)  
    }
  }
  this.createTree(mytreedata,document.getElementById('tree_root').clientWidth,document.getElementById('tree_root').clientHeight)
}
//------------------------------------------------------------------------------------------------------------
componentDidMount(){
  this.prepare_and_call_create_tree()
}
componentWillUpdate(){
  this.prepare_and_call_create_tree()
return true;
}
//-----------------------------------------------------------------Render function starts here  
render() {
  return (
      <div className="tree_container">
        <svg id="tree_root" style={{width:'100%',height:'500px'}}></svg>
      </div>  
  );
  }
}
export default Tree;

//http://www.d3noob.org/2014/01/tree-diagrams-in-d3js_11.html