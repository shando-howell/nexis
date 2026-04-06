import Link from "next/link";

const Header = () => {
    return (
        <div>
            <h1 className="text-3xl uppercase text-white p-4 tracking-widest">
                <Link href="/">Nexis</Link>
            </h1>
        </div>
    )
}

export default Header;