import React from "react";
import Link from "next/link";

function profile({ User, handleSignOut }) {
    return (
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight py-2 text-gray-900 md:text-2xl dark:text-white">
                Hello
            </h1>
            <h1 class="text-xl font-bold leading-tight tracking-tight py-2 text-gray-900 md:text-2xl dark:text-white">
                {!!User ? User.displayName : email}
            </h1>
            <p className="py-2">{!!User ? User.email : email}</p>

            <div className="mb-6 py-2">
                <Link
                    className="text-xl font-sans font-bold text-[#fffefe] bg-[#2145c5] px-4 py-2 w-1/2 h-12 items-start rounded-lg  hover:shadow-md hover:shadow-blue-700/70  hover:duration-300  "
                    href="/api/logout"
                    onClick={handleSignOut}
                >
                    Logout
                </Link>
            </div>
        </div>
    );
}

export default profile;
