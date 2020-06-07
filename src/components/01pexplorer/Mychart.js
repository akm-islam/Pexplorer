import React, { Component } from 'react';
import Plot from 'react-plotly.js'
class Mychart extends Component {
    constructor(props){
        super(props)
        this.state={isOpen:false,all_chars:null,clicked_characteristics:[],tree_vis:null,volume:0,popoverOpen:false,setPopoverOpen:false,mytarget:"id1"}
        this.target="id1";
      }
componentDidMount(){
  
}
componentDidUpdate(){
  
}
shouldComponentUpdate(nextProps, nextState){
  
    if(this.props.data===nextProps.data){
      
      return true}
    else{
      
      return true}
}
render(){
    return(
        <div className="mychart" style={{margin:"0px auto",marginTop:"10px",width:'100%',height:'352px'}}> 
        <Plot
        data={[
         {
          x:Object.keys(this.props.data),
          y:Object.values(this.props.data),
          type:'scattergl',
          name: "My First Chart",

        },
        {
          x:Object.keys(this.props.data),
          y:Object.values(this.props.data),
          type:'scattergl',
          name: "My Second Chart",

        }
        ]}
        layout={{width:600,height: 385, title: 'A Fancy Plot',  
        xaxis: {
        showticklabels: false},
        yaxis: {
        title: 'y-axis title',
        range: [0, 100],
        autorange: false}
        }}
        >
        </Plot>
        </div>
    )
}
}
export default Mychart;

