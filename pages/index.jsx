import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";

export default function HomePage({ username }) {
  return (
    <Layout pageTitle="Home">
      {username ? (
        <>
          <div className="flex justify-center items-center min-h-screen m-0 p-0">
            <div>
              <h2 className="text-3xl font-bold ">Hi {username}.</h2>
              <div className="mb-6">
                <Link
                  className="px-10 py-4 rounded font-bold ease-in text-black duration-150 hover:bg-[#5b2d90] hover:text-white "
                  href="/profile"
                >
                  Profile
                </Link>
              </div>
              <br />
              <div className="mb-6">
                <Link
                  className="px-10 py-4 rounded ease-in text-black duration-150 hover:bg-[#5b2d90] hover:text-white"
                  href="/api/logout"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center min-h-screen m-0 p-0">
            <div className="w-80 h-96 flex flex-col items-center justify-center shadow-[rgba(165,137,190,0.4)_0px_0px_0px_2px,rgba(91,45,144,0.65)_0px_4px_6px_-1px,rgba(255,255,255,0.08)_0px_1px_0px_inset]  rounded-lg ">
              <h2 className="my-12 font-bold text-5xl text-[--dark-accent]">
                HELLO
              </h2>
              <div className="my-6">
                <Link
                  className="px-11 py-4 rounded font-bold ease-in text-black duration-150 border-2 border-[--dark-accent] hover:bg-[--dark-accent] hover:text-white "
                  href="/login"
                >
                  Login
                </Link>
              </div>

              <br />
              <div className="mb-10">
                <Link
                  className="px-10 py-4 rounded font-bold ease-in text-black duration-150 border-2 border-[--dark-accent] hover:bg-[--dark-accent] hover:text-white "
                  href="/signup"
                >
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  var username = getCookie("username", { req, res });
  if (username == undefined) {
    username = false;
  }
  return { props: { username } };
}
