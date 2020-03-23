// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import Navbar from './Navbar.js'
import TextEditSidebar from './TextEditSidebar.js'
import TextEditWorkspace from './TextEditWorkspace.js'

export class EditScreen extends Component {
    constructor(props) {
        super(props);

        // DISPLAY WHERE WE ARE
        console.log("\tEditScreen constructor");

        this.state = {  
            deleteModalVisible: false
        }
    }

    componentDidMount = () => {
        console.log("\tEditScreen component did mount");
        document.addEventListener("keydown",this.controlFunction);
    }

    componentWillUnmount = () => {
        console.log("\tEditScreen component will unmount");
        document.removeEventListener("keydown", this.controlFunction);
    }
    
    controlFunction=(event)=>{
        if(event.ctrlKey && event.keyCode === 90){
            console.log("ctrl z");
            if(this.props.canUndo()){
                this.props.undoCallback();
                this.forceUpdate();
            }
        }
        else if(event.ctrlKey && event.keyCode === 89){
            console.log("ctrl y");
            if(this.props.canDo()){
                this.props.doCallback();
                this.forceUpdate();
            }
        }
    }
    
    render() {
        // DISPLAY WHERE WE ARE
        console.log("\tEditScreen render");
        return (
            <div className="container"> 
                <Navbar 
                    goToHomeCallback={this.props.goToHomeCallback} 
                    deleteLogoCallback={this.props.deleteLogoCallback}
                    logo={this.props.logo}
                />
                <div className="row">
                    <TextEditSidebar
                        logo={this.props.logo}
                        changeLogoCallback={this.props.changeLogoCallback}
                        undoCallback={this.props.undoCallback}    
                        doCallback = {this.props.doCallback}                                      
                        canUndo={this.props.canUndo}   
                        canDo = {this.props.canDo}                      
                    />
                    <TextEditWorkspace
                        logo={this.props.logo} />
                </div>
            </div>
        )
    }
}

export default EditScreen