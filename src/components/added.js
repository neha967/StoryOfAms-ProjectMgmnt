import React, {Component} from "react";
import axios from "axios";

class Added extends Component{
    constructor(props){
        super(props);
        this.state = {
            stages: ["Flowchart", "Wireframe", "Prototype", "Development", "Test", "Launch"],
            style: {
                visibility: "hidden"
            }
        }
    }

    showSelectList = () => {
        this.setState({
            style: {
                visibility: "visible"
            }
        })
    }

    render(){
        let currentStage = this.props.project.stage
        return(
            <div class="new-project">
                <div class="delete">
                    <h3>{this.props.project.title}</h3>
                    <span onClick={()=>this.props.deleteHandler(this.props.project._id)}>&times;</span>
                </div>
                <p>{this.props.project.description}</p>
                <button onClick={this.showSelectList}>Move to</button>
                <select style={this.state.style} onChange={(e)=>this.props.updateStateHandler(e, this.props.project._id)}>
                <option value="Select" selected disabled>Select</option>
                {this.state.stages.map(stage=>(
                    currentStage !== stage ?
                    <option value={stage}>{stage}</option>
                : null))}
                </select>
            </div>
        )
    }
}

export default Added;