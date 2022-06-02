import './App.css';

import OrderBook from './containers/orderBook';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bitfinex Programming Challenge</h1>
      </header>
      <main>
          <div className="widget">
              <OrderBook />
          </div>
      </main>
    </div>
  );
}

export default App;
