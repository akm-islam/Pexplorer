import React, { Component } from 'react';
import * as d3 from 'd3';
import './css/tree.css';

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
height = 350 - margin.top - margin.bottom,
dataSource = treeData[0],
i = 0;
console.log(mywidth)
/*
if(mywidth<570){
  width = 560 - margin.right - margin.left;
}*/

//------------------------- Generate the treeLayout and the Diagonal 
var treeLayout = d3.layout.tree().size([width, height]);
var diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y]; });
var svg = d3.select(this.node).append("svg") // select the node
.attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom).attr("id","svg_container")
.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var nodes = treeLayout.nodes(dataSource),
links = treeLayout.links(nodes);
nodes.forEach(function(d) { d.y = d.depth * 230; }); // Normalize for fixed-depth
//------------------------- Declare the nodes and Enter the nodes
var node = svg.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); }); // attach data to nodes
var nodeEnter = node.enter().append("g").attr("class", "node").attr("transform", function(d) { 
return "translate(" + d.x + "," + d.y + ")"; });

//-----------Circle and percentage
nodeEnter.append("circle")
//.attr("r",(d)=> 0).transition().duration(2000)
.attr("r",(d)=> d.percentage!='Traits'?22:26).attr("fill",(d)=>d.percentage==highest_value?"#F7882F":"#4ceebd").attr("id",(d)=>d.percentage=='Traits'?"p_circle":"mycircle");
//-----Enter text
nodeEnter.append("text").attr("y", 0).attr("dy", ".35em").attr("text-anchor", "middle")
.text(function(d) { 
  if(d.percentage!="Traits"){
    return d.percentage+"%";
  }
  else{
    return d.percentage;
  }
  

})
//.style("font","0px sans-serif").transition().duration(2000)
.style("font","12px sans-serif").style("fill-opacity", 1).attr("class",(d)=>{
if(d.percentage=="Traits"){
  return "parent"
}
else{
  return "text1";
}
});
//----------- Text for personality traits
nodeEnter.append("text")
   .attr("x", 0)
   .attr("dy", ".35em")
   .attr("y", 40)
   .attr("text-anchor", "middle")
   .text(function(d) { 
     if(d.percentage!='Traits')return d.trait_name; 
    })
 //   attr("fill",(d)=>d.percentage==highest_value?"#f1a814":"#4ceebd")
    .style("font",(d)=>d.percentage==highest_value?"9px sans-serif":"10px sans-serif")
    .transition().duration(800).style(()=>{
      if(width<570){
        return "font","10px sans-serif"
      }
      else 
      return "font","10px sans-serif";
    })
   .attr("class","text2");

   svg.selectAll("g.node").data(nodes, function(d) { return d.id || (d.id = ++i); }).exit().remove()
//------------------------- Declare  and enter the links
var link = svg.selectAll("path.link").data(links, function(d) { return d.target.id; });
link.enter().insert("path", "g").attr("class", "link")
//.style("opacity",0).transition().duration(2000)
.style("opacity",.5).attr("d", diagonal);
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