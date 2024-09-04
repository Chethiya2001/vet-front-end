import React from "react";
import Link from "next/link";
import Image from "next/image";

const AsideBar = ({ role }) => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col py-6">
      <nav className="flex-1">
        <Image
          src="/icon.png"
          alt="Vet Vantage Management System"
          width={200}
          height={200}
          className="mx-auto pt-5 py-5"
        />
        <ul className="space-y-2 mt-30">
          <li>
            <Link href="/" className="block p-4 hover:bg-gray-700">
              Home
            </Link>
          </li>
          {role === "admin" && (
            <li>
              <Link href="/admin" className="block p-4 hover:bg-gray-700">
                Admin
              </Link>
            </li>
          )}
          <li>
            <Link href="/doctor" className="block p-4 hover:bg-gray-700">
              Doctor
            </Link>
          </li>
          <li>
            <Link href="/staff" className="block p-4 hover:bg-gray-700">
              Staff
            </Link>
          </li>
          <li>
            <Link href="/register" className="block p-4 hover:bg-gray-700">
              Register
            </Link>
          </li>
          <li>
            <Link href="/login" className="block p-4 hover:bg-gray-700">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AsideBar;
