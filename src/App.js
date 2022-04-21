import { cafe1Day } from './assets/videos/index'

function App() {
  return (
    <div className="App">
        <video src={cafe1Day} autoPlay loop muted/>
    </div>
  );
}

export default App;
