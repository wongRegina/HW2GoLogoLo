// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import LogoLink from './LogoLink'

class LogoLinks extends Component {
    constructor(props) {
        super(props);

        // DISPLAY WHERE WE ARE
        console.log("\t\tLogoLinks constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\tLogoLinks did mount");
    }

    componentWillUnmount = () => {
        console.log("\t\t\tLogoLinks will unmount");
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\tLogoLinks render");

        return (
            <div id="home_recent_work_list">{
                this.props.logos.map((logo)=>(
                    <LogoLink  
                        key={logo.key}
                        logo={logo}                                 // PASS THE LOGO TO THE CHILDREN
                        goToLogoCallback={this.props.goToLogoCallback}  />  // PASS THE CALLBACK TO THE CHILDREN
                ))}
            </div>
        );
    }
}

export default LogoLinks;