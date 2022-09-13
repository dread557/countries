import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';
import Navbar from './components/Navbar';
import { ThemeContext } from './contexts/ThemeContext';


function App() {

  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme ? light : dark

  return (
    <div className='App' style={{ background: theme.bg, color: theme.txt }} >
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Countries />} />
        <Route path='/countries' element={<Countries />} />
        <Route path='/countries/:Id' element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;
