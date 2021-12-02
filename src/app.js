import "./app.css";
import Chart from "./components/chart";
import Map from "./components/map";
import Appbar from './components/controls/Appbar'

function App() {
  return (
    <div className="App">
      <div className="side">
        <div className="control">
          {/* <Goal />
          <Year /> */}
          <Appbar />
        </div>
        <Chart />
      </div>
      <Map />
    </div>
  );
}

export default App;
