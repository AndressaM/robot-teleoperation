import Footer from "./components/Footer";
import Header from "./components/Hearder";
import Body from "./components/Body";
import React from 'react'
import Config from "./scripts/config";

Config.ROSBRIDGE_SERVER_IP = '10.0.0.151'

function App() {
  return (
    <div className="App">
      <Header/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
