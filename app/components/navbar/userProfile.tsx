'use client';

import { authClient } from '@/app/lib/auth-client';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

export default function UserProfile() {
    const {data: session} = authClient.useSession();
    const username = session?.user?.name || session?.user?.email || "Guest";
    const image = session?.user?.image;

    return (
        <div className="group relative flex shrink-0 gap-2 w-[15%] items-center justify-center overflow-hidden hover:text-black rounded-full transition-all after:absolute after:h-0 after:w-0 after:rounded-full after:bg-white after:duration-500 after:ease-out after:transition-all after:delay-100 before:absolute before:h-0 before:w-0 before:rounded-full before:bg-black-600 before:duration-500 before:ease-out before:z-10 before:transition-all hover:shadow-orange-600 hover:after:h-100 hover:after:w-100 hover:after:delay-0 hover:before:h-100 hover:before:w-100 hover:before:delay-100">
            {/* <UserCircleIcon className='h-auto w-[2vw] mx-2 text-white group-hover:text-black z-20 transition-colors delay-100 group-hover:delay-0' /> */}
            <div className="flex items-center gap-2 text-sm text-neutral-400 z-100">
             <Avatar className="h-8 w-8 border border-neutral-800">
               <AvatarImage src={image || ""} />
               <AvatarFallback>{username.charAt(0)}</AvatarFallback>
             </Avatar>
             {/* <span className="hidden md:inline">{username}</span> */}
           </div>
            <label 
                htmlFor='User Profile'
                className='peer block py-[9px] group-hover:text-black z-20 transition-colors delay-300 group-hover:delay-0 cursor-pointer'
            >
                {username}
            </label>
        </div>
    )
}
