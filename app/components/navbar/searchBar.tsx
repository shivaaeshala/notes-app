'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
    const handleSearch = (e: string) => {
        console.log(e);
    }
    return (
        <div className='relative flex flex-1 flex-shrink-0 h-10 w-full'>
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input 
                className="peer block bg-white text-black w-full rounded-full py-[9px] pl-10 pr-5 text-sm outline-2 placeholder:text-gray-500"
                placeholder='Search notes...'
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    )
}