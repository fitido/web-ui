import React from 'react';
import { VscMenu, VscClose } from 'react-icons/vsc';


function AppBar({showSideBar, toggleSideBar}) {
  return (
    <nav class="bg-white">
  <div class="mx-auto px-2">
    <div class="relative flex h-16 items-center justify-between">
      <div class="flex items-center border rounded-md hover:border-green-500">
        <button type="button" 
         class="relative hidden sm:block inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
         aria-controls="mobile-menu" aria-expanded="false" onClick={()=>toggleSideBar()}>
          <VscMenu />
        </button>
        <button type="button" 
         class="relative visible sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
         aria-controls="mobile-menu" aria-expanded="false" onClick={()=>toggleSideBar()}>
          {!showSideBar && <VscMenu />}
          {showSideBar && <VscClose />}
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