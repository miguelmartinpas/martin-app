import React from "react";
import "./App.less";

class App extends React.Component {
  render() {
    const value = "Showcase App!!!";
    return (
      <div className="main">
        <input
          value={value}
          onChange={(event) => console.log("event", event.currentTarget.value)}
        ></input>
        Hello world
      </div>
    );
  }
}
export default App;
