// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

export class LogoLink extends Component {
    constructor(props) {
        super(props);

        // DISPLAY WHERE WE ARE
        console.log("\t\t\tLogoLink " + this.props.logo.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tLogoLink " + this.props.logo.key + " did mount");
    }

    componentWillUnmount = () => {
        console.log("\t\t\tLogoLink " + this.props.logo.key + " will unmount");
    }

    handleGoToLogo = () => {
        this.props.goToLogoCallback(this.props.logo);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tLogoLink render");

        return (
            <div 
                className='home_logo_link'                
                style={ {cursor: "pointer"} }
                onClick={this.handleGoToLogo}
            >
                {this.props.logo.text}<br />
            </div>
        )
    }
}

export default LogoLink