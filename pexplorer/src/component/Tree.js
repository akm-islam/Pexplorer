import React, { Component } from 'react';
import * as d3 from 'd3';
import './css/treeLayout.css';

class Tree extends Component {
  constructor(props) {
  super(props);
  this.state = {level_names:["Health", "Education", "Crime"] };
  this.createTree=this.createTree.bind(this)
}
//---------------------------------------------------------------------------CreateTreemap starts here
createTree(mytreedata){
  console.log(mytreedata)
  var treeData=[mytreedata]
/*
  var treeData = [
        {
          "name": "You",
          "parent": "null",
          "children": [
            {
              "name": "40%",
              "name2":"Openness",
              "parent": "Top Level"
            },
            {
              "name": "30%",
              "name2":"Conscientiousness",
              "parent": "Top Level"
            },
            {
                "name": "15%",
                "name2":"Extraversion",
                "parent": "Top Level"
              },
              {
                "name": "15%",
                "name2":"Agreeableness",
                "parent": "Top Level"
            },
            {
                "name": "15%",
                "name2":"Neuroticism",
                "parent": "Top Level"
            }
          ]
        }
      ];
    */
//------------------------- Initial set ups
var margin = {top: 60, right: 120, bottom: 20, left: 120},
width = 560 - margin.right - margin.left,
height = 500 - margin.top - margin.bottom,
dataSource = treeData[0],
i = 0;

//------------------------- Generate the treeLayout and the Diagonal 
var treeLayout = d3.layout.tree().size([height, width]);
var diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y]; });
var svg = d3.select(this.node).append("svg") // select the node
.attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom)
.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//------------------------- Compute the new treeLayout layout.
var nodes = treeLayout.nodes(dataSource),
links = treeLayout.links(nodes);
nodes.forEach(function(d) { d.y = d.depth * 230; }); // Normalize for fixed-depth

//------------------------- Declare the nodes and Enter the nodes
var node = svg.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); }); // attach data to nodes
var nodeEnter = node.enter().append("g").attr("class", "node").attr("transform", function(d) { 
return "translate(" + d.x + "," + d.y + ")"; });
nodeEnter.append("circle").transition().duration(2000).attr("r",(d)=> d.name!='You'?20:25);
nodeEnter.append("text").attr("y", 0).attr("dy", ".35em").attr("text-anchor", "middle").text(function(d) { return d.name; }).style("fill-opacity", 1).attr("class",(d)=>{
if(d.name=="You"){
  return "parent"
}
else{
  return "text1";
}
});
// second text
nodeEnter.append("text")
   .attr("x", 0)
   .attr("dy", ".35em")
   .attr("y", -40)
   .attr("text-anchor", "middle")
   .text(function(d) { 
     if(d.name!='You')return d.name2; 
    })
   .attr("class","text2");
   

//------------------------- Declare  and enter the links
var link = svg.selectAll("path.link").data(links, function(d) { return d.target.id; });
link.enter().insert("path", "g").attr("class", "link").transition().duration(2000).attr("d", diagonal);
}
componentDidMount(){
  var traits=["Openness","Conscientiousness","Extraversion","Agreeableness","Neuroticism"]
  var data=this.props.data
  var clicked_characteristics=this.props.clicked_characteristics
  // looping start here
  var children=[]
  for(var i=0;i<traits.length;i++){
    var count=0
    var mydict={}
    var arr=[]
    var trait=traits[i]
    console.log(this.props.data[trait])
    for(var j=0;j<clicked_characteristics.length;j++){
      var characterstic=clicked_characteristics[j]
      //console.log(this.props.data[trait]["High"],characterstic)
      if(this.props.data[trait]["High"].includes(characterstic)){
        arr.push(characterstic)
        count=count+1
        //console.log(trait,characterstic)
      }
      else if(this.props.data[trait]["Low"].includes(characterstic)){
        arr.push(characterstic)
        count=count+1
        //console.log(trait,characterstic)
      }
    }
    console.log("Trait ",trait," percentage: ",(count/clicked_characteristics.length)*100)
    var percentage=(count/clicked_characteristics.length)*100
    mydict["name"]=percentage.toFixed(1).toString()+"%"
    mydict["name2"]=trait
    mydict["parent"]="Top Level"
    mydict["characteristics"]=arr
    children.push(mydict)
  }
  //console.log(children)
  var mytreedata={"name":"You","parent":"null","children":children}
  this.createTree(mytreedata)
}
//-----------------------------------------------------------------Render function starts here  
render() {
  return (
    <div>
        <div ref={node => this.node = node}>
        </div>
    </div>
  
  );
  }
}
export default Tree;

//http://www.d3noob.org/2014/01/tree-diagrams-in-d3js_11.html