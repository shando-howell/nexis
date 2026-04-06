import Link from "next/link";

const Header = () => {
    return (
        <div className="flex">
            <div className="flex-1">
                <h1 className="text-3xl uppercase text-white p-4 tracking-widest">
                    <Link href="/">Nexis</Link>
                </h1>
            </div>
            <div className="flex p-4">
                <h1 className="uppercase px-2 mr-2 bg-indigo-600">
                    <Link href="/dashboard">Dashboard</Link>
                </h1>
                <h1 className="uppercase px-2 bg-indigo-600">
                    <Link href="/chat">Chat</Link>
                </h1>
            </div>
        </div>
    )
}

export default Header;