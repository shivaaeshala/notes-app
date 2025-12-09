import Logo from "../components/navbar/logo";
import SearchBar from "../components/navbar/searchBar";
import UserProfile from "../components/navbar/userProfile";
import CreateNote from "../components/navbar/createNote";

export default function Navbar() {
    return (
        <div className="flex w-full items-center justify-between p-4 sm:px-6 md:px-20 m-auto gap-4">
            {/* Logo - always on left */}
            <Logo />
            
            {/* Desktop: Full search bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                <SearchBar />
            </div>
            
            {/* Right side: Icons on mobile, full components on desktop */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                {/* Mobile: Search icon, Desktop: Hidden (search bar shown above) */}
                <div className="md:hidden">
                    <SearchBar />
                </div>
                
                <UserProfile />
                <CreateNote />
            </div>
        </div>
    )
}