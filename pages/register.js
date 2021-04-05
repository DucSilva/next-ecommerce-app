import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import valid from '../utils/valid';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import { useRouter} from 'next/router';

const Register = () => {
  const initialState = { name: '', email: '', password: '', cf_password: '' }
  const [userData, setUserData] = React.useState(initialState);
  const { name, email, password, cf_password } = userData;

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
    const errMsg = valid(name, email, password, cf_password)
    if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
    dispatch({ type: 'NOTIFY', payload: { loading: true } })

    const res = await postData('auth/register', userData);
    if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
  }

  return (
    <div>
      <Head>
        <title>Register Page</title>
      </Head>

      <form className="mx-auto my-4" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={email} onChange={handleInputChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword2">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword2" name="cf_password" value={cf_password} onChange={handleInputChange} />
        </div>

        <button type="submit" className="btn btn-primary w-100"> Register </button>
        <p className="my-2">
          Already have an account?
          <Link k href="/signin">
            <a style={{ color: 'crimson' }}> Login now</a>
          </Link>
        </p>
      </form>
    </div>
  )
};


export default Register;