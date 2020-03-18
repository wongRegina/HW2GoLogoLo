import React from 'react'

class Navbar extends React.Component {
  constructor() {
    super();

    console.log("Navbar constructed");
  }

  componentDidMount = () => {
      console.log("\tNavbar component did mount");
  }

  componentWillUnmount = () => {
      console.log("\tNavbar component will unmount");
  }

  handleGoHome = () => {
    console.log("handleGoHome");
    this.props.goToHomeCallback();
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper" style={{marginLeft: "20pt"}}>
          <div  className='brand-logo' 
                style={ {cursor: "pointer", fontSize: "xxx-large"} }
                onClick={this.handleGoHome}>
            goLogoLo
          </div>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li style={ {cursor: "pointer", fontSize: "xxx-large"} }>&#128465;</li>
          </ul>
        </div>
      </nav>
    )
  };
}

export default Navbar;