import React, {Component} from "react";
import Add from "./add";
import Added from "./added";
import axios from "axios"

class Header extends Component{

    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            newProjectState: [],
            flowcharts: [],
            wireframes: [],
            prototypes: [],
            developments: [],
            tests: [],
            launchs: [],
        }
    }

    fetchAndLoadProjects = () => {
        axios.get("http://localhost:5000/fetchprojects")
        .then(response=>{
            let flowcharts = (response.data.filter(each=>(
                each.stage === "Flowchart"
            )))
            let wireframes = (response.data.filter(each=>(
               each.stage === "Wireframe"
            )))
            let prototypes = (response.data.filter(each=>(
                each.stage === "Prototype"
            )))
            let developments = (response.data.filter(each=>(
                each.stage === "Development"
            )))
            let tests = (response.data.filter(each=>(
                each.stage === "Test"
            )))
            let launchs = (response.data.filter(each=>(
                each.stage === "Launch"
            )))

            this.setState({
                flowcharts:flowcharts,
                wireframes:wireframes,
                prototypes:prototypes,
                developments:developments,
                tests:tests,
                launchs:launchs
            })

        })
        .catch(err=>console.log(err))
    }

    componentDidMount(){      
        this.fetchAndLoadProjects()
    }

    
    deleteHandler = (id) => {
        axios.post(`http://localhost:5000/delete/${id}`)
        .then(response=>{
            this.fetchAndLoadProjects()
            this.setState({
                newProjectState: []
            })
        })
        .catch(err=>console.log(err))
    }

    
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateStateHandler = (e,id) => {
        let newStage = e.target.value;

        axios.post(`http://localhost:5000/update/${id}/${newStage}`)
        .then(response=>{
            this.fetchAndLoadProjects()
            this.setState({
                newProjectState: []
            })
        })
    }
    
    submitHandler = (e) => {
        e.preventDefault();

        let project = {
            title: this.state.title,
            description: this.state.description
        }

        axios.post("http://localhost:5000/addproject", project)
        .then(response=>{

            let newProjectArray = [...this.state.newProjectState]
            newProjectArray.push(response.data)

            this.setState({
                newProjectState: newProjectArray
            })
        })
        .catch(error=>console.log(error))
    }

    render(){
        return(
            <div class="container">
                <div class="heading">
                    <div></div>
                    <div>Flowcharts</div>
                    <div>Wireframes</div>
                    <div>Prototype</div>
                    <div>Development</div>
                    <div>Test</div>
                    <div>Launch</div>
                    <div></div>
                </div>
                <div class="content">
                    <div></div>
                    <div>
                    {this.state.flowcharts.map(each=>(
                        <Added project={each} deleteHandler={this.deleteHandler} updateStateHandler={this.updateStateHandler}/>
                    ))}             
                    {this.state.newProjectState.map(each=>(
                        <Added project={each} deleteHandler={this.deleteHandler} updateStateHandler={this.updateStateHandler}/>
                    ))}        
                    </div>
                    <div>
                    {this.state.wireframes.map(each=>(
                        <Added project={each} deleteHandler={this.deleteHandler} updateStateHandler={this.updateStateHandler}/>
                    ))}
                    </div>
                    <div>
                    {this.state.prototypes.map(each=>(
                        <Added project={each} deleteHandler={this.deleteHandler} updateStateHandler={this.updateStateHandler}/>
                    ))}
                    </div>
                    <div>
                    {this.state.developments.map(each=>(
                        <Added project={each} deleteHandler={this.deleteHandler} updateStateHandler={this.updateStateHandler}/>
                    ))}
                    </div>
                    <div>
                    {this.state.tests.map(each=>(
                        <Added project={each} deleteHandler={this.deleteHandler} updateStateHandler={this.updateStateHandler}/>
                    ))}
                    </div>
                    <div>
                    {this.state.launchs.map(each=>(
                        <Added project={each} deleteHandler={this.deleteHandler} updateStateHandler={this.updateStateHandler}/>
                    ))}
                    </div>
                    <div></div>
                </div>
                <Add submitHandler={this.submitHandler} changeHandler={this.changeHandler}/>
            </div>
        )
    }
}

export default Header;