import React, {useState} from 'react';
import AppBar from "./components/AppBar";
import Planner from "./components/planner/Planner";
import Progress from "./components/analysis/Progress";
import { QueryClient, QueryClientProvider } from 'react-query';

const tabs = [
    { label: 'Notes'},
    { label: 'Analysis'},
];
const queryClient = new QueryClient();

function App() {
  const[activeTab, setActiveTab]=useState(0);

  function getActiveComponent() {
    if (activeTab === 0) {
      return <Planner />
    } else if (activeTab === 1){
      return <Progress />
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div class="flex h-screen flex-col">
        <AppBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div class="flex-1">
          {getActiveComponent()}
        </div>
        
      </div>
    </QueryClientProvider>
  );
}

export default App;
