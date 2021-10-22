import logo from "./logo.svg";
import "./App.css";

import VStepper from "./stepper";



function App() {
  const list = {
    Fab:[
      { title: "F12", group:null, id: null},
      { title: "F14", group: null, id: null},
      { title: "F15", group: null, id: null }
    ],
    Model:[
      { title: "A1", group:"F12", id: "F12-A1"},
      { title: "B1", group: "F12", id: "F12-B1"},
      { title: "C1", group: "F14", id: "F14-C1" },
      { title: "A2", group:"F14", id: "F14-A2"},
      { title: "B2", group: "F15", id: "F15-B2"},
      { title: "C2", group: "F15", id: "F15-C2" }
    ],
    Func:[
      { title: "f1", group: "F12, A1", id: "F12-A1-f1" },
      { title: "f2", group: "F12, B1", id: "F12-B1-f2" },
      { title: "f3", group: "F14, C1", id: "F14-C1-f3" },
      { title: "f1", group: "F14, A2", id: "F14-A2-f1" },
      { title: "f2", group: "F15, B2", id: "F15-B2-f2" },
      { title: "f3", group: "F15, C2", id: "F15-C2-f3" },
      { title: "f4", group: "F12, A1", id: "F12-A1-f4" },
      { title: "f5", group: "F14, A2", id: "F14-A2-f5" },
      { title: "f6", group: "F15, B2", id: "F15-B2-f6"}
    ]
  };

  return (
    <div className="App">
      <header className="App-header">
        <VStepper list = {list}/>
        
      </header>
    </div>
  );
}

export default App;
