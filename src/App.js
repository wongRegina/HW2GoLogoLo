// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import goLogoLoData from './data/goLogoLoData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import EditScreen from './components/edit_screen/EditScreen'
import jsTPS from './transactions/jsTPS.js'
import ChangeLogo_Transaction from './transactions/ChangeLogo_Transaction.js'

// THESE ARE THE App SCREENS
const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  EDIT_SCREEN: "EDIT_SCREEN"
}

// THESE ARE THE VARIOUS TRANSACTION TYPES
// OUR APP WILL PROCESS USING OUR TRANSACTION
// PROCESSING SYSTEM
export const TransactionType = {
  CHANGE_LOGO: "CHANGE_LOGO"
}

// DEFAULT VALUES FOR A BRAND NEW LOGO
export const LogoDefaults = {
  TEXT : "goLogoLo Logo",
  TEXT_COLOR : "#FF0000",
  FONT_SIZE : 24
}

// App IS THE ROOT REACT COMPONENT
class App extends Component {

  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recent_work = localStorage.getItem("recent_work");
    if (!recent_work) {
      // IF IT'S NOT LOAD IT FROM THE JSON FILE AND THEN ADD IT TO LOCAL STORAGE
      recent_work = JSON.stringify(goLogoLoData.recent_work);
      localStorage.setItem("recent_work", recent_work);
    }
    // IN EITHER CASE, PARSE THE TEXT TO TURN IT INTO USABLE DATA
    recent_work = JSON.parse(recent_work);
    console.log("recent_work: " + recent_work);

    // SETUP OUR APP STATE
    this.state = {
      currentScreen: AppScreen.HOME_SCREEN,
      logos: recent_work,
      currentLogo: {}
    }
  }

  // WE'LL USE React LIFECYCLE METHODS LIKC componentDidMount
  // AND componentWillUnmount

  componentDidMount = () => {
    // THIS METHOD GETS CALLED BEFORE THE FIRST RENDER
    console.log("App did mount");
  }

  componentWillUnmount = () => {
    // THIS METHOD ONLY GETS CALLED IF THE APP IS REMOVED FROM THE PAGE
    console.log("App will unmount");
  }

  /**
   * getHighKey - This helper method finds the next available unique
   * key presumably for a new logo being added. It does so by looking
   * through all the logos that currently exist and finding the highest
   * existing key value (it's an integer) and simply returning one
   * more than that highest key value.
   */
  getHighKey = (array) => {
    let highKey = 0;
    array.forEach((arrayElement) => {
      if (arrayElement.key > highKey)
        highKey = arrayElement.key;
    });
    highKey++;
    return highKey;
  }

  // THERE ARE TWO NAVIGATION METHODS
    // goToHomeScreen
    // goToLogoScreen

  // AFTER THE STATE IS SET IT WILL FORCE A RENDER OF THIS 
  // FULL App COMPONENT USING THE HomeScreen
  goToHomeScreen = () => {
    // MAKE SURE THE UNDO/REDO SYSTEM IS RESET, WE DON'T WANT
    // OUR undo/redo SYSTEM TO HAVE ANY LEFTOVER TRANSACTIONS
    // IN THE STACK THAT ARE NO LONGER RELEVANT
    this.resetTransactions();

    // UPDATE THE STATE ACCORDINGLY
    this.setState({
      currentScreen: AppScreen.HOME_SCREEN,
      currentLogo: {}
    });
  }

  // AFTER THE STATE IS SET IT WILL FORCE A RENDER OF THIS 
  // FULL App COMPONENT USING THE EditScreen  
  goToEditScreen = (logo) => {    
    // MAKE SURE logo IS AT THE TOP OF THE RECENT WORK LIST BY REMOVING
    // IT AND THEN PREPENDING

    // SO FIRST REMOVE logo BY FILTERING IT OUT
    const nextLogos = this.state.logos.filter(testLogo =>
      testLogo.key !== logo.key
    );

    // THEN PREPENDS THE LOGO WE'LL BE EDITING
    nextLogos.unshift(logo);

    // AND SET THE STATE OF THIS APP SO WE ARE EDITING logo
    // NOTE THAT IT'S A LITTLE BIT FUNNY THAT WE ARE DOING IT
    // THIS WAY AS WE ARE LOADING ALL THE LOGOS AND THEN KEEPING
    // THEM ALL LOADED. WE WILL CHANGE THIS ONCE WE HAVE A DATEBASE
    this.setState({
      currentScreen: AppScreen.EDIT_SCREEN,
      logos: nextLogos,
      currentLogo: logo
    });
  }

  // FUNCTIONS FOR DEALING WITH THE TRANSACTION PROCESSING SYSTEM:
    // buildChangeLogoTransaction
    // undo
    // resetTransactions
    // canUndo

  /**
   * buildChangeLogoTransacation - This serves as a callback function for adding
   * a change logo request to the transaction stack. This means it will build
   * a change logo transaction, which itself will use another callback function
   * to do the actual work of changing the logo. Note that this function will also
   * then add the built transaction to the stack and execute it.
   */
  buildChangeLogoTransaction = (oldLogo, logoKey, newText, newTextColor, newFontSize) => {
    // THIS WILL BE THE LOGO AFTER THE CHANGE HAPPENS, NOTE WE BUILD
    // AN ENTIRELY NEW LOGO EACH TIME BUT IT SHOULD KEEP THE SAME KEY
    let postEditLogo = {
      key: logoKey,
      text: newText,
      textColor: newTextColor,
      fontSize: newFontSize
    };

    // NOW BUILD THE TRANSACTION OBJECT
    let transaction = new ChangeLogo_Transaction(
      this.changeLogo, oldLogo, postEditLogo);

    // AND ADD THE TRANSACTION TO THE STACK, WHICH WILL ALSO
    // CAUSE IT TO EXECUTE (i.e. DO IT)
    this.tps.addTransaction(transaction);
  }

  /**
   * undo - This callback function lets the EditScreen undo
   * the latest transaction, whatever that may be. Note that
   * if there is no transaction to undo it will do nothing.
   */
  undo = () => {
    this.tps.undoTransaction();
  }

  /**
   * resetTransactions - This method clears all the transactions in
   * the undo/redo stack, which should be done every time the logo
   * being edited changes.
   */
  resetTransactions = () => {
    this.tps.clearAllTransactions();
  }

  /**
   * canUndo - This method lets the user interface know if there are
   * any undoable transactions in the transactions stack so that it
   * can choose to enable or disable the undo button.
   */
  canUndo = () => {
    return this.tps.hasTransactionToUndo();
  }

  // THERE ARE SEVEN FUNCTIONS FOR UPDATING THE App state, TWO OF
  // THEM CANNOT BE UNDONE AND SO DO NOT REQUIRE TRANSACTIONS:
  // addNewLogo
  // changeLogo
  // deleteLogo

  // THIS ADDS A DEFAULT NEW LOGO TO OUR LIST OF LOGOS
  addNewLogo = () => {
    console.log("addNewLogo");

    // MAKE WHAT THE UPDATED LOGO WILL BE WITH THE NEW LOGO, MAKING
    // SURE THEY ARE FIRST, AND MAKE THAT NEW LOGO THE ONE WE'LL EDIT
    let newLogoInList = [this.makeNewLogo()];
    let newLogosList = [...newLogoInList, ...this.state.logos];
    let newLogo = newLogoInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      logos: newLogosList,
      currentLogo: newLogo,
      nextKey: newLogo.key
    }, this.afterLogosChangeComplete);
  }

  // FOR MAKING A BRAND NEW LOGO
  makeNewLogo = () => {
    let newLogo = {
      key: this.getHighKey(this.state.logos),
      text: LogoDefaults.TEXT,
      textColor: LogoDefaults.TEXT_COLOR,
      fontSize: LogoDefaults.FONT_SIZE
    }
    return newLogo;
  }

  // DELETE THE LOGO WITH logoKey 
  deleteLogo = (logoKey) => {
    console.log("logo to delete: " + logoKey);

    // UPDATE THE LIST OF LOGOS, REMOVING LOGO
    const nextLogos = this.state.logos.filter(testLogo =>
      testLogo.key !== logoKey
    );

    console.log("size of nextLogos: " + nextLogos.length);

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      logos: nextLogos
    }, this.afterLogoDeleted);
  }

  // THIS CHANGES THE LOGO
  changeLogo = (newLogo) => {
    console.log("changeLogo is the callback");

    // UPDATE THE LIST OF LOGOS, SUBSTITUTING THE UPDATED LOGO
    const nextLogos = this.state.logos.map((testLogo) => {
      if (testLogo.key === newLogo.key) {
        return Object.assign({}, testLogo, newLogo);
      } else {
        return testLogo;
      }
    });
    this.completeLogosChange(nextLogos);
  }

  // THERE ARE 3 SERVICE FUNCTIONS CALLED AFTER A LOGO EDIT
    // completeLogosChange
    // afterLogosChangeComplete
    // afterLogoDeleted

  completeLogosChange = (nextLogos) => {
    // NOW GET THE LOGO TO EDIT
    const nextLogoToEdit = nextLogos.find((testLogo) => {
      return (testLogo.key === this.state.currentLogo.key);
    });
    console.log("nextLogoToEdit: " + nextLogoToEdit);

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      logos: nextLogos,
      currentLogo: nextLogoToEdit
    }, this.afterLogosChangeComplete);
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LOGO, WHICH
  // FOR THIS APP ALWAYS LEAVE US AT EditScreen
  afterLogosChangeComplete = () => {
    //console.log("App updated lists: " + this.listsToString(this.state.todoLists));
    console.log("App updated currentLogo: " + this.logoToString(this.state.currentLogo));

    // WILL THIS WORK? @todo
    let logosString = JSON.stringify(this.state.logos);
    localStorage.setItem("recent_work", logosString);

    this.goToEditScreen(this.state.currentLogo);
  }

  afterLogoDeleted = () => {
    console.log("App afterLogoDeleted logos: " + this.logosToString(this.state.logos));
    // FIRST GO HOME
    this.goToHomeScreen();
  }

  // THERE ARE TWO FUNCTIONS TO HELP GENERATE OUTPUT FOR DEBUGGING
    // logoToString
    // logosToString

  // CREATES AND RETURNS A TEXTUAL SUMMARY OF logoToDisplay
  logoToString = (logoToDisplay) => {
    let text = "";
    text += "{\n";
    text += "\ttext: " + logoToDisplay.text + "\n";
    text += "\ttextColor: " + logoToDisplay.textColor + "\n";
    text += "\tfontSize: " + logoToDisplay.fontSize + "\n";
    text += "}";
    return text;
  }

  // CREATES AND RETURNS A TEXTUAL SUMMARY OF logosToDisplay
  logosToString = (logosToDisplay) => {
    if (!this.state.useVerboseFeedback)
      return "";
    let text = "";
    for (let i = 0; i < logosToDisplay.length; i++) {
      text += i + ": ";
      let logoToDisplay = logosToDisplay[i];
      text += this.logoToString(logoToDisplay);
      if (i < logosToDisplay.length - 1)
        text += ",";
      text += "\n";
    }
    return text;
  }

  // THIS FUNCTION RENDERS THE App COMPONENT, AND THUS
  // CASCADES ALL NECESSARY props AND RENDERING THROUGH
  // THE WHOLE PROGRAM
  render() {
    console.log("App render");
    switch (this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen
          logos={this.state.logos}                // THE LOGOS TO BE DISPLAYED
          addNewLogoCallback={this.addNewLogo}            // MAKE NEW LOGO CALLBACK
          goToLogoCallback={this.goToEditScreen}          // WORK ON SELECTED LOGO CALLBACK
        />;
      case AppScreen.EDIT_SCREEN:
        return <EditScreen
          logo={this.state.currentLogo}                         // DATA NEEDED BY THIS COMPONENT AND ITS DESCENDANTS
          goToHomeCallback={this.goToHomeScreen}                    // NAVIGATION CALLBACK
          changeLogoCallback={this.buildChangeLogoTransaction}  // TRANSACTION CALLBACK
          undoCallback={this.undo}                        // TRANSACTION CALLBACK                       
          canUndo={this.canUndo}                          // TRANSACTION CALLBACK

        />;
      default:
        return <div></div>;
    };
  }
}

export default App;