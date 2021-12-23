import React from 'react';
import './App.css';
import ImageHeader from './components/ImageHeader';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <div className="App">
      <ImageHeader/>
      <AppRoutes></AppRoutes>
    </div>
  );
}

export default App;
