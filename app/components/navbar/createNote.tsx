import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function CreateNote() {
    return (
        <Link
            href='#'
            className='group relative flex shrink-0 w-[15%] items-center justify-center gap-1 overflow-hidden bg-white text-black transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black before:duration-500 before:ease-out hover:shadow-white hover:before:h-56 hover:before:w-56'
        >
            <label htmlFor="Create Note"
                className='peer block py-[9px] text-black group-hover:text-white z-20 transition-colors delay-300 group-hover:delay-0 cursor-pointer'
            >
                Create Note 
            </label>
            <PlusIcon className='w-[2vw] text-black group-hover:text-white z-10 transition-colors delay-300 group-hover:delay-0'/>
        </Link>
    )
}