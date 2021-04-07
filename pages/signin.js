import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

const Signin = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = React.useState(initialState);
  const { email, password } = userData;

  const {state, dispatch} = React.useContext(DataContext);
  const {auth} = state;

  const router = useRouter();

  React.useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value })
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    const res = await postData('auth/login', userData);
    if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

    dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    dispatch({ type: 'AUTH', payload: {
      token: res.access_token,
      user: res.user
    } })

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
  }
  return (
    <div>
      <Head>
        <title>Sign in Page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={handleInputChange}/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"  name="password" value={password} onChange={handleInputChange} />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
        <p className="my-2">
          You don't have an account?
        <Link href="/register">
            <a style={{ color: 'crimson' }}> Register now</a>
          </Link>
        </p>
      </form>
    </div>
  )
};

export default Signin;