import Logo from "../components/navbar/logo";
import SearchBar from "../components/navbar/searchBar";
import UserProfile from "../components/navbar/userProfile";

export default function Navbar() {
    return (
        <div className="flex w-full content-center p-5 px-20 m-auto gap-10">
            <Logo />
            <SearchBar />
            <UserProfile />
        </div>
    )
}