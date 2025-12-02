import { UserCircleIcon } from '@heroicons/react/24/outline'
import Link from "next/link"

export default function UserProfile() {
    return (
        <Link href='#' className="group relative flex shrink-0 w-[20%] items-center justify-center overflow-hidden hover:text-black rounded-full transition-all after:absolute after:h-0 after:w-0 after:rounded-full after:bg-white after:duration-500 after:ease-out after:transition-all after:delay-100 before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black-600 before:duration-500 before:ease-out before:z-10 before:transition-all hover:shadow-orange-600 hover:after:h-100 hover:after:w-100 hover:after:delay-0 hover:before:h-100 hover:before:w-100 hover:before:delay-100">
            <UserCircleIcon className='h-auto w-[2vw] mx-2 text-white group-hover:text-black z-20 transition-colors delay-300 group-hover:delay-0' />
            <label 
                className='peer block py-[9px] group-hover:text-black z-20 transition-colors delay-300 group-hover:delay-0 cursor-pointer'
            >
                Username
            </label>
        </Link>
    )
}
