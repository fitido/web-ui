function AppBar() {
  return (
    <nav class="bg-white">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
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
            <a href="#" class="border-b-2 border-green-600 text-green-600 px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
            <a href="#" class="text-gray-700 hover:border-b-2 hover:border-green-500 hover:text-green-500 px-3 py-2 text-sm font-medium">Planner</a>
            <a href="#" class="text-gray-700 hover:border-b-2 hover:border-green-500 hover:text-green-500 px-3 py-2 text-sm font-medium">Workouts</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <a href="#" class="border-b-2 border-green-600 text-green-600 block px-3 py-2 text-base font-medium" aria-current="page">Dashboard</a>
      <a href="#" class="text-gray-700 hover:border-b-2 hover:border-green-500 hover:text-green-500 block px-3 py-2 text-base font-medium">Planner</a>
      <a href="#" class="text-gray-700 hover:border-b-2 hover:border-green-500 hover:text-green-500 block px-3 py-2 text-base font-medium">Workouts</a>
    </div>
  </div>
</nav>
  );
}

export default AppBar;