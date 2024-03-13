import React, {useState} from 'react';
import { Sidebar } from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import { Select } from 'flowbite-react';
import { VscBook } from 'react-icons/vsc';


const theme = {
    "root": {
      "base": "h-full",
      "collapsed": {
        "on": "w-16",
        "off": "w-64"
      },
      "inner": "h-full overflow-y-auto overflow-x-hidden border-r border-gray-200 py-4 px-3"
    },
    "collapse": {
      "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100",
      "icon": {
        "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
        "open": {
          "off": "",
          "on": "text-gray-900"
        }
      },
      "label": {
        "base": "ml-3 flex-1 whitespace-nowrap text-left",
        "icon": {
          "base": "h-6 w-6 transition ease-in-out delay-0",
          "open": {
            "on": "rotate-180",
            "off": ""
          }
        }
      },
      "list": "space-y-2 py-2"
    },
    "cta": {
      "base": "mt-6 rounded-lg p-4 bg-gray-100",
      "color": {
        "blue": "bg-cyan-50 dark:bg-cyan-900",
        "dark": "bg-dark-50 dark:bg-dark-900",
        "failure": "bg-red-50 dark:bg-red-900",
        "gray": "bg-alternative-50 dark:bg-alternative-900",
        "green": "bg-green-50 dark:bg-green-900",
        "light": "bg-light-50 dark:bg-light-900",
        "red": "bg-red-50 dark:bg-red-900",
        "purple": "bg-purple-50 dark:bg-purple-900",
        "success": "bg-green-50 dark:bg-green-900",
        "yellow": "bg-yellow-50 dark:bg-yellow-900",
        "warning": "bg-yellow-50 dark:bg-yellow-900"
      }
    },
    "item": {
      "base": "flex hover:text-green-500 items-center justify-center rounded-md p-2 text-base hover:bg-gray-100",
      "active": "bg-gray-100 text-green-500",
      "collapsed": {
        "insideCollapse": "group w-full pl-8 transition duration-75",
        "noIcon": "font-bold"
      },
      "content": {
        "base": "px-3 flex-1 whitespace-nowrap"
      },
      "icon": {
        "base": "h-6 w-6flex-shrink-0 text-gray-500 transition duration-75 hover:text-green-500 group-hover:text-green-500",
        "active": "text-green-500"
      },
      "label": "",
      "listItem": ""
    },
    "items": {
      "base": ""
    },
    "itemGroup": {
      "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0"
    },
    "logo": {
      "base": "mb-5 flex items-center pl-2.5",
      "collapsed": {
        "on": "hidden",
        "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      },
      "img": "mr-3 h-6 sm:h-7"
    }
  };
function SideBar({showSideBar, tabs, activeTab, setActiveTab, setSelectedTrainee, trainer}) {  
  if (!showSideBar) {
    return null;
  }  
  return (
    <Sidebar theme={theme}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Select id="trainees"
         class="px-3 py-2 border-gray-200 text-gray-700 text-base font-medium rounded-md focus:outline-none focus:ring-transparent focus:border-gray-200 block w-full"
         onChange={(e) => setSelectedTrainee(e.target.value)}>
        {trainer.trainees.map((trainee) => (
          <option key={trainee.id} 
            value={trainee.id}>
              {trainee.name}
          </option>
        ))}
        </Select>        
        {tabs.map((tab, index) => (
            <Sidebar.Item active={activeTab==index} href="#" onClick={()=>setActiveTab(index)} icon={tab.icon}>
                {tab.label}
            </Sidebar.Item>
	    ))} 
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
