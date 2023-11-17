import Layout from '../components/layout';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignupPage({ username }) {
  const router = useRouter();
  const { msg } = router.query;

  return (
    <Layout pageTitle="Signup">
      <Link href="/">Home</Link>
      <br />
      {msg ? <h3 className="red">{msg}</h3> : <></>}
      <div className="login-container">
        <h2>Sign up</h2>
        <form action="/api/signup" method="POST">
          <input minLength="3" name="username" id="username" type="text" placeholder="Username" required />
          <br />
          <input minLength="5" name="password" id="password" type="password" placeholder="Password" required />
          <br />
          <input minLength="5" name="passwordagain" id="passwordagain" type="password" placeholder="Password again" required />
          <br />
          <input type="submit" value="Signup" />
        </form>
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

        input[type=text],
        input[type=password] {
          padding: 10px;
          border-radius: 15px;
          border: 2px solid var(--primary);
          background-color: transparent;
          outline: none;
          font-size: 15px;
          transition: 0.2s;
          width: 200px;
          margin-bottom: 30px;
          color: var(--font-color);
          text-align: center;
        }

        input[type=text]:focus,
        input[type=password]:focus {
          border-color: var(--dark-accent);
        }

        /* Additional styles for the signup page if needed */
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  var username = getCookie('username', { req, res });

  if (username !== undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return { props: { username: false } };
}
