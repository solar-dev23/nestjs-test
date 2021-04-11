import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

interface IPrice {
  assetId: string;
  value: number
}

function App() {
  const [price, setPrice] = useState<IPrice>();
  const handleClick = (type: string) => {
    axios
      .get<IPrice>(`http://localhost:5000/price?asset=${type}`)
      .then(response => {
        setPrice(response.data);
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ChompBTC Test</h1>
        <div className="button-group">
          <button onClick={() => handleClick('BTC')}>BTC</button>
          <button onClick={() => handleClick('ETH')}>ETH</button>
        </div>
        {price && (
          <div className="price-info">
            <p>Asset: {price.assetId}</p>
            <p>Price: {price.value}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
