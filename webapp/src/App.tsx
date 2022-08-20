import { Topbar } from './components/Topbar';
import { Web3Provider } from './providers/web3';




function App() {
  return (
    <Web3Provider>
      <Topbar />
    </Web3Provider>
  );
}

export default App;
