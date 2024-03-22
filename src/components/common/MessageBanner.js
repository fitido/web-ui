import React from 'react';

function MessageBanner({data}) {
    if (data === "") {
        return
    }
    
    return (
        <div class="absolute bottom-10 w-full flex items-center justify-center opacity-75 z-10">
           <p class="px-2 py-1 bg-gray-100 border border-gray-500 rounded-md text-sm text-gray-700 font-semibold">{data}</p>
        </div>
    )

}

export default MessageBanner;