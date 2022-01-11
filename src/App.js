import './App.css';
import ZipSearch from './components/ZipSearch'
import CitySearch from './components/CitySearch';
import React, { Component } from 'react';

class App extends Component{
  render()
  {
      return 
        (
          <div>
              <ZipSearch />
          </div>
        )
  }
}
export default App;
