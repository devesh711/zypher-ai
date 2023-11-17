import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginPage({ username }) {
  const router = useRouter();
  const { msg } = router.query;

  return (
    <Layout pageTitle="Login">
      <Link href="/">Home</Link>
      <div className="flex justify-center items-center min-h-screen m-0 p-0">
        <br />
        {msg ? <h3 className="red">{msg}</h3> : <></>}
        <div className="login-container">
          <h2>Log in</h2>
          <form action="/api/login" method="POST">
            <input
              minLength="3"
              name="username"
              id="username"
              type="text"
              placeholder="Username"
              required
            />
            <br />
            <input
              minLength="5"
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
            <br />
            <input
              className="px-10 py-4 rounded ease-in text-black duration-150 hover:bg-[#5b2d90] hover:text-white"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
      <style jsx>{`
        .login-container {
          background-color: var(--light-background);
          border-radius: 15px;
          padding: 20px;
          width: 300px;
          margin: 0 auto;
        }

        .login-container h2 {
          color: var(--primary);
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  var username = getCookie("username", { req, res });

  if (username !== undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return { props: { username: false } };
}
