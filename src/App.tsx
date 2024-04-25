import React from 'react';
import Calendar from './components/Calendar';
import { IconAdd } from './components/Icon/IconAdd';
import { createFromIconfont } from './components/Icon/createFrontIconfont';
import Space from './components/Space';
import  './App.css';
import { ConfigProvider } from './components/Space/ConfigProvider';


function App() {
 
  return (
    <div className="App">
      <ConfigProvider space={{size: 112}}>

       <Space wrap  split={<div>23</div>} align='start' className="container">
          <div className="box">3434</div>
          <div className="box">999</div>
          <div className="box">999</div>
       </Space>
      </ConfigProvider>
    </div>
  );
}

export default App;

