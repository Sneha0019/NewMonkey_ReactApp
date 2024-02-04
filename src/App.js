import "./App.css";
import LoadingBar from 'react-top-loading-bar'

import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import News from "./components/News.js";


import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  const pageSize = 20;
  const apiKey = process.env.REACT_APP_API_KEY;

  const [progress, setProgress] = useState(0);
  


    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
           color='#f11946'
           height={3}
          progress={progress}
      />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country={"in"} category={"General"} />} />
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country={"in"} category={"Business"} />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={"in"} category={"Entertainment"} />} />
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={"in"} category={"General"} />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country={"in"} category={"Health"} />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country={"in"} category={"Science"} />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country={"in"} category={"Sports"} />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country={"in"} category={"Technology"} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App;

