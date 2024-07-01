import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen h-full overflow-auto">
        <Sidebar />
				<div className="w-full">
          <Content />
				</div>
			</div>
    </Router>
  );
}

export default App;

