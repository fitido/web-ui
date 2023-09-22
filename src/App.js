import React, {useState} from 'react';
import AppBar from "./components/AppBar";
import Workouts from "./pages/Workouts";
import { QueryClient, QueryClientProvider } from 'react-query';

const tabs = [
    { label: 'Planner'},
    { label: 'Workouts'},
];
const queryClient = new QueryClient();

function App() {
  const[activeTab, setActiveTab]=useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <AppBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Workouts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
