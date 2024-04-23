import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchSpotify from './SearchSpotify';
const App = () => {
  return (
    <div>
      <SearchSpotify />
    </div>
  );
};

export default App;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
