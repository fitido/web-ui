import React, {useState} from 'react';

function AppBar({tabs, activeTab, setActiveTab, trainer, setSelectedTrainee}) {
  const[showMobileMenu, setShowMobileMenu]=useState(false);
  return (
    <nav class="bg-white">
  <div class="mx-auto px-2 sm:px-6 lg:px-8 border">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" 
         class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
         aria-controls="mobile-menu" aria-expanded="false" onClick={()=>setShowMobileMenu(!showMobileMenu)}>
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>
          <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
          <span class="rounded-md font-bold px-3 text-xl text-green-600 hover:text-green-500">fitido</span>
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
          <div class="flex">
            <select 
              id="trainees" 
              onChange={(e) => setSelectedTrainee(e.target.value)}
              class="text-gray-700 hover:text-green-500 hover:border-b-2 hover:border-green-500 outline-none text-sm font-medium w-full p-2">
              {trainer.trainees.map((trainee) => (
                <option key={trainee.id} 
                  value={trainee.id}>
                    {trainee.name}
                </option>
              ))}
            </select>
          </div>
	        {tabs.map((tab, index) => (
	          <p
	           class={index === activeTab ? "border-b-2 border-green-600 text-green-600 px-3 py-2 flex h-16 justify-center items-center text-sm font-medium" : "flex h-16 justify-center items-center text-gray-700 hover:border-b-2 hover:border-green-500 hover:text-green-500 px-3 py-2 text-sm font-medium"}
	           onClick={()=>setActiveTab(index)}
	           >
	           {tab.label}
	           </p>
	        ))}
          </div>
          
        </div>
      </div>
    </div>
  </div>

  {showMobileMenu && <div class="sm:hidden border shadow-sm" id="mobile-menu">
  <div class="space-y-1 px-2 pt-2 w-auto">
            <select 
              id="trainees" 
              onChange={(e) => setSelectedTrainee(e.target.value)}
              class="text-gray-700 hover:text-green-500 outline-none text-base font-medium w-full p-2">
              {trainer.trainees.map((trainee) => (
                <option key={trainee.id} 
                  value={trainee.id}>
                    {trainee.name}
                </option>
              ))}
            </select>
          </div>
    <div class="space-y-1 px-2 pb-2">
      {tabs.map((tab, index) => (
	    <p
	     class={index === activeTab ? "text-green-600 block px-3 py-2 text-base font-medium" : "text-gray-700  hover:text-green-500 block px-3 py-2 text-base font-medium"}
	     onClick={()=>setActiveTab(index)}
	     >
	     {tab.label}
	     </p>
	  ))}
    </div>
    
  </div>}
</nav>
  );
}

export default AppBar;