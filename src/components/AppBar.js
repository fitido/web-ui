import React, {useState} from 'react';

function AppBar({tabs, activeTab, setActiveTab, trainer, setSelectedTrainee, toggleSideBar}) {
  return (
    <nav class="bg-white">
  <div class="mx-auto px-2">
    <div class="relative flex h-16 items-center justify-between">
      <div class="flex items-center border rounded-md hover:border-green-500">
        <button type="button" 
         class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
         aria-controls="mobile-menu" aria-expanded="false" onClick={()=>toggleSideBar()}>
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
          <span class="rounded-md font-bold px-3 text-2xl text-green-600 hover:text-green-500">fitido</span>
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex items-center justify-center w-10 h-10"></div>
      </div>
      </div>
    </div>
</nav>
  );
}

export default AppBar;