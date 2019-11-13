import React, {Component} from "react";
import axios from "axios";

class Add extends Component{

    render(){
        return(
            <div class="add">
                <h1>New project</h1>
                <form method="POST" onSubmit={this.props.submitHandler}>
                    <input type="text" placeholder="Project Title" name="title" onChange={this.props.changeHandler}/>
                    <input type="text" placeholder="Project Description" name="description" onChange={this.props.changeHandler} class="description"/>
                    <input type="submit" placeholder="Add Project" value="Add Project"/>
                </form>
            </div>
        )
    }
}

export default Add;

