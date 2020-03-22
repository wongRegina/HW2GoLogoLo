import React, { Component } from 'react';
import {Modal, Button, TextInput} from 'react-materialize';

class TextEditSidebar extends Component {
    constructor(props) {
        super(props);

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            textUpdate: this.props.logo.text,
            text: this.props.logo.text,
            fontSize: this.props.logo.fontSize,
            textColor: this.props.logo.textColor,
            backgroundColor: this.props.logo.backgroundColor,
            borderColor: this.props.logo.borderColor,
            borderRadius: this.props.logo.borderRadius,
            borderWidth: this.props.logo.borderWidth,
            padding: this.props.logo.padding,
            margin: this.props.logo.margin
        };
    }

    handleUndo = () => {
        console.log("handleUndo");
        this.props.undoCallback();
    }

    handleDo = () =>{
        console.log("handleDo");
        this.props.doCallback();
    }

    handleChangeText = (event) =>{
        console.log("handleChangeText: " + this.state.textUpdate);
        let text = (this.state.textUpdate).replace(" ","\xa0");
        this.setState({ text: text }, this.completeUserEditing);
    }

    editingText= (event) =>{
        // this.state.textUpdate=event.target.value;
        this.setState({textUpdate:event.target.value});
    }

    cancelText = () =>{
        // this.state.textUpdate=this.props.logo.text;
        this.setState({textUpdate:this.props.logo.text});
    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ textColor: event.target.value }, this.completeUserEditing);
    }

    handleFontSizeChange = (event) => {
        console.log("handleTextFontChangeComplete to " + event.target.value);
        this.setState({ fontSize: event.target.value }, this.completeUserEditing);
    }

    handleBackgroundColorChange = (event) => {
        console.log("handleBackgroundColorChange to " + event.target.value)
        this.setState({ backgroundColor: event.target.value }, this.completeUserEditing);
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChange to " + event.target.value)
        this.setState({ borderColor: event.target.value }, this.completeUserEditing);
    }

    handleBorderRadiusChange = (event) => {
        console.log("handleBorderRadiusChange to " + event.target.value)
        this.setState({ borderRadius: event.target.value }, this.completeUserEditing);
    }

    handleborderWidthChange = (event) => {
        console.log("handleborderWidthChange to " + event.target.value)
        this.setState({ borderWidth: event.target.value }, this.completeUserEditing);
    }

    handlePaddingChange = (event) => {
        console.log("handlePaddingChange to " + event.target.value)
        this.setState({ padding: event.target.value }, this.completeUserEditing);
    }

    handleMarginChange = (event) => {
        console.log("handleMarginChange to " + event.target.value)
        this.setState({ margin: event.target.value }, this.completeUserEditing);
    }

    completeUserEditing = () => {
        console.log("completeUserEditing");
        console.log("this.state.textColor: " + this.state.textColor);
        this.props.changeLogoCallback(this.props.logo, this.props.logo.key, this.state.text, this.state.textColor, 
            this.state.fontSize, this.state.backgroundColor, this.state.borderColor, this.state.borderRadius,
            this.state.borderWidth, this.state.padding, this.state.margin);
    }

    render() {
        let undoDisabled = !this.props.canUndo();
        let doDisabled = !this.props.canDo();
        let undoClass = "waves-effect waves-light btn-small";
        let doClass = "waves-effect waves-light btn-small";
        if (undoDisabled)
            undoClass += " disabled";
        if(doDisabled)
            doClass += " disabled";
        return (
            <div className="card-panel col s4">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <Modal
                            options={{ dismissible: false }}
                            actions={[
                                <div>
                                    <Button flat modal="close" node="button" waves="green" onClick={this.cancelText}>Close</Button>
                                    <button className="modal-close waves-effect waves-light btn-small" onClick={this.handleChangeText} >Enter</button>
                                </div>
                            ]}
                            data-backdrop="static"
                            header="Edit Text"
                            trigger = {<button className="waves-effect waves-light btn-small">Edit Text &#9998;</button>}>
                                Enter a name for your logo:
                            <TextInput 
                                value={this.state.textUpdate} 
                                editable = "true"
                                onChange = {this.editingText}
                            />
                        </Modal>
                        <button className={undoClass} onClick={this.handleUndo}>Undo</button>
                        <button className={doClass} onClick={this.handleDo}>Redo</button>
                    </div>
                </div>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title"> {this.props.logo.text}</span>
                        {/* TEXT COLOR */}
                        <div className="row">
                            <div className="col s7"> Text Color:</div>
                            <div className="col s5">
                                <input type="color"
                                        onChange={this.handleTextColorChange}
                                        value={this.props.logo.textColor}
                                />
                            </div>
                        </div>
                        {/* FONT SIZE */}
                        <div className="row">
                            <div className="col s7">Font Size:</div>
                            <div className="col s5">{this.props.logo.fontSize + " pt"}</div>
                        </div>
                        <div className="row">
                                <input type="range" min="4" max="144" 
                                    onChange={this.handleFontSizeChange}
                                    value={this.props.logo.fontSize} />
                        </div>
                        {/* BACKGORUND COLOR */}
                        <div className="row">
                            <div className="col s7">Background Color:</div>
                            <div className="col s5">
                                <input type="color"
                                        onChange={this.handleBackgroundColorChange}
                                        value={this.props.logo.backgroundColor}/>
                            </div>
                        </div>
                        {/* BORDER COLOR */}
                        <div className="row">
                            <div className="col s7">Border Color:</div>
                            <div className="col s5">
                                <input type="color"
                                        onChange={this.handleBorderColorChange}
                                        value={this.props.logo.borderColor}
                                />
                            </div>
                        </div>
                        {/* BORDER RADUIS */}
                        <div className="row">
                            <div className="col s7"> Border Radius:</div>
                            <div className="col s5">{this.props.logo.borderRadius + " pt"}</div>
                        </div>
                        <div className="row">
                            <input type="range" min="0" max="50" 
                                onChange={this.handleBorderRadiusChange}
                                value={this.props.logo.borderRadius} />
                        </div>
                        {/* BORDER WIDTH */}
                        <div className="row">
                            <div className="col s7">Border Thickness:</div>
                            <div className="col s5">{this.props.logo.borderWidth + " pt"}</div>
                        </div>
                        <div className="row">
                            <input type="range" min="0" max="50" 
                                onChange={this.handleborderWidthChange}
                                value={this.props.logo.borderWidth} />
                        </div>
                        {/* PADDING */}
                        <div className="row">
                            <div className="col s7">Padding:</div>
                            <div className="col s5">{this.props.logo.padding + " pt"}</div>
                        </div>
                        <div className="row">
                            <input type="range" min="0" max="50" 
                                onChange={this.handlePaddingChange}
                                value={this.props.logo.padding} />
                        </div>
                        {/* MARGINS */}
                        <div className="row">
                            <div className="col s4">Margin:</div>
                            <div className="col s8">{this.props.logo.margin + " pt"}</div>
                        </div>
                        <div className="row">
                            <input type="range" min="0" max="20" 
                                onChange={this.handleMarginChange}
                                value={this.props.logo.margin} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TextEditSidebar