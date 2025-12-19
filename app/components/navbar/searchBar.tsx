'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog";
import { useSearch } from '@/app/context/search-context';

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const { searchQuery, setSearchQuery } = useSearch();

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }

    return (
        <>
            {/* Mobile: Icon button that opens dialog */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden p-2 rounded-full hover:bg-neutral-800 transition-colors"
                aria-label="Search notes"
            >
                <MagnifyingGlassIcon className="h-6 w-6 text-white" />
            </button>

            {/* Desktop: Full search bar */}
            <div className='hidden md:relative md:flex flex-1 flex-shrink-0 h-10 w-full min-w-0'>
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input 
                    id="search"
                    className="peer block bg-white text-black w-full rounded-full py-2 sm:py-[9px] pl-9 sm:pl-10 pr-4 sm:pr-5 text-sm placeholder:text-gray-500 border-none"
                    placeholder='Search notes...'
                    value={searchQuery}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                />
                <MagnifyingGlassIcon className="absolute left-2.5 sm:left-3 top-1/2 h-4 w-4 sm:h-[18px] sm:w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 pointer-events-none" />
            </div>

            {/* Mobile: Search dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px] bg-black border-neutral-800">
                    <DialogHeader>
                        <div className='relative flex flex-1 flex-shrink-0 h-10 w-full min-w-0'>
                            <label htmlFor="mobile-search" className="sr-only">
                                Search
                            </label>
                            <input 
                                id="mobile-search"
                                className="peer block bg-white text-black w-full rounded-full py-2 pl-10 pr-10 text-sm placeholder:text-gray-500 border-none"
                                placeholder='Search notes...'
                                value={searchQuery}
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                }}
                                autoFocus
                            />
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                                aria-label="Close search"
                            >
                                <XMarkIcon className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}