import React from 'react'
// import { Modal } from 'materialize-css';
import {Modal, Button} from 'react-materialize';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

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

  handleDelete = (event) =>{
    console.log("handleDelete: " + this.props.logo.key);
    this.props.deleteLogoCallback(this.props.logo.key);
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
            <Modal
              options={{ dismissible: false }}
              actions={[
                  <div>
                      {/* <Button flat modal="close" node="button" waves="green">no</Button> */}
                      <button className = "modal-close waves-effect waves-light btn-small">No</button>
                      <button className = "modal-close waves-effect waves-light btn-small" onClick={this.handleDelete}>Yes</button>
                      {/* <button  onClick={this.handleChangeText} >Enter</button> */}
                  </div>
              ]}
              header="Delete Logo"
              trigger = {<Button flat style={{ fontSize: 40 }}>&#128465;</Button>}
            >
              Do you want to delete your logo?
            </Modal>
          </ul>
        </div>
      </nav>
    )
  };
}

export default Navbar;