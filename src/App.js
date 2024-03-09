import React, {useState} from 'react';
import AppBar from "./components/AppBar";
import Planner from "./components/planner/Planner";
import Trends from "./components/analysis/Trends.js";
import Health from "./components/health/Health.js";
import { useQuery } from 'react-query';
import fetchWithBaseUrl from './components/Fetch.js'

const fetchTrainer = async () => {
  const response = await fetchWithBaseUrl('/trainers/1');
  const data = await response.json();
  return data;
};

const tabs = [
    { label: 'Health'},
    { label: 'Notes'},
    { label: 'Trends'},
];

function App() {
  const[activeTab, setActiveTab]=useState(0);
  const[selectedTrainee, setSelectedTrainee]=useState(null);
  const { data, isLoading, isError, error } = useQuery('trainer', fetchTrainer);

  const setSelect = async (id) => {
    console.log("setSelect",id);  
    setSelectedTrainee(id);
  };

  function getActiveComponent() {
    if (!selectedTrainee) {
      setSelectedTrainee(data.trainees[0].id);
    }
    if (activeTab === 0) {
      return <Health traineeId={selectedTrainee}/>
    } else if (activeTab === 1) {
      return <Planner traineeId={selectedTrainee}/>
    } else if (activeTab === 2){
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
        setSelectedTrainee={setSelect}/>
      <div class="flex-1">
        {getActiveComponent()}
      </div>
    </div>
  );
}

export default App;
