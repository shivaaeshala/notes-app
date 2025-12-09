'use client';

import { authClient } from '@/app/lib/auth-client';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

export default function UserProfile() {
    const {data: session} = authClient.useSession();
    const username = session?.user?.name || session?.user?.email || "Guest";
    const image = session?.user?.image;

    return (
        <div className="flex items-center gap-2">
            {/* Mobile: Avatar only, Desktop: Avatar + username */}
            <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border border-neutral-800">
                <AvatarImage src={image || ""} />
                <AvatarFallback className="bg-neutral-800 text-white">
                    {username.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            {/* Desktop only: Username */}
            <span className='hidden md:inline-block text-sm text-neutral-400 max-w-[150px] truncate'>
                {username}
            </span>
        </div>
    )
}