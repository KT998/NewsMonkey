
import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const  App = () => {
  var pageSize=15;
  var apiKey=process.env.REACT_APP_NEWS_API;
  const [progress,setProgress]=useState(0);
  
  
 
    return (
      <Router>
       
        <div>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
          <NavBar />
        </div>
        <Routes>
          <Route exact path="/"  element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="general" country="in" category="general" />}></Route>
          <Route exact path="/business"  element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="business" country="in" category="business" />}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="entertainment" country="in" category="entertainment" />}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="health" country="in" category="health" />}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="science" country="in" category="science" />}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} key="sports" country="in" category="sports" />}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress}  apiKey={apiKey} pageSize={pageSize} key="technology" country="in" category="technology" />}></Route>
        </Routes>
       </Router>

    )
  
}

export default App
