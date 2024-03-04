import React, {useState} from 'react';
import AppBar from "./components/AppBar";
import Planner from "./components/planner/Planner";
import Progress from "./components/analysis/Progress";
import { useQuery } from 'react-query';
import fetchWithBaseUrl from './components/Fetch.js'

const fetchTrainer = async () => {
  const response = await fetchWithBaseUrl('/trainers/1');
  const data = await response.json();
  return data;
};

const tabs = [
    { label: 'Notes'},
    { label: 'Analysis'},
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
      return <Planner traineeId={selectedTrainee}/>
    } else if (activeTab === 1){
      return <Progress />
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div class="flex h-screen flex-col bg-gray-50">
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
