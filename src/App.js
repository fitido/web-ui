import React, {useState} from 'react';
import AppBar from "./components/AppBar";
import Planner from "./components/planner/Planner";
import Trends from "./components/analysis/Trends.js";
import Health from "./components/health/Health.js";
import Info from "./components/health/Info.js";
import { useQuery } from 'react-query';
import fetchWithBaseUrl from './components/Fetch.js'
import SideBar from './components/SideBar.js';
import { VscHeart, VscOutput, VscPulse, VscFlame, VscInfo } from 'react-icons/vsc';

const fetchTrainer = async () => {
  const response = await fetchWithBaseUrl('/trainers/1');
  const data = await response.json();
  return data;
};

const tabs = [
    { label: 'Info', icon: VscInfo},
    { label: 'Health', icon: VscHeart},
    { label: 'Notes', icon: VscOutput},
    { label: 'Trends', icon: VscPulse},
    { label: 'Milestones', icon: VscFlame},
];

function App() {
  const[activeTab, setActiveTab]=useState(0);
  const[showSideBar, setShowSideBar]=useState(false);
  const[selectedTrainee, setSelectedTrainee]=useState(null);
  const { data, isLoading, isError, error } = useQuery('trainer', fetchTrainer);

  const setSelect = async (id) => {
    console.log("setSelect",id);  
    setSelectedTrainee(id);
  };

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  function getActiveComponent() {
    if (!selectedTrainee) {
      setSelectedTrainee(data.trainees[0].id);
    }
    if (activeTab === 0) {
      return <Info traineeId={selectedTrainee}/>
    } else if (activeTab === 1) {
      return <Health traineeId={selectedTrainee}/>
    } else if (activeTab === 2) {
      return <Planner traineeId={selectedTrainee}/>
    } else if (activeTab === 3){
      return <Trends traineeId={selectedTrainee}/>
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div class="flex h-screen flex-col">
      <AppBar 
        tabs={tabs} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        trainer={data}
        setSelectedTrainee={setSelect}
        toggleSideBar={toggleSideBar}/>
      
      <div class="flex-1">
        <div class="flex flex-row h-full border">
          <SideBar 
           showSideBar={showSideBar}
           tabs={tabs} 
           activeTab={activeTab} 
           setActiveTab={setActiveTab} 
           trainer={data}
           setSelectedTrainee={setSelect}
          />
          <div class="flex-1">
            {getActiveComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
