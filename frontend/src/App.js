import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Navbar from './components/Navbar';
import MessageHome from './components/MessageHome';
import MessageDetails from './components/MessageDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
      <div className="pages">
        <Routes>
          <Route 
            path="/" 
            element={<MessageHome />}>
          </Route>
        </Routes>
      </div>
      <Routes>
        <Route path="api/messages/:id"
          element={<MessageDetails />}>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;