import Head from 'next/head';
import Link from 'next/link';

const Signin = () => {
  return (
    <div>
      <Head>
        <title>Sign in Page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: 600 }}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit</button>
        <p className="my-2">
          You don't have an account?
          <Link href="/register">
            <a style={{ color: 'crimson' }}> Register </a>
          </Link>
        </p>
      </form>
    </div>
  )
};

export default Signin;