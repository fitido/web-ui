import React, {useState} from 'react';
import AppBar from "./components/AppBar";

const tabs = [
    { label: 'Planner'},
    { label: 'Workouts'},
];
function App() {
  const[activeTab, setActiveTab]=useState(0);

  return (
    <div>
      <AppBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
