'use client'
import { LogOut } from "@/actions/logout"

const LogOutButton = () => {
    return <button onClick={() => LogOut()} className="button bg-[#C86E7A] text-white p-1.5 rounded-lg hover:bg-rose-300">Log Out</button>
}

export default LogOutButton