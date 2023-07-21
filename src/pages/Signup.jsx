import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Btn from '../components/Btn';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Alert from '../components/Alert';
import Main from '../components/Main';

export default function Signup() {
  const [er, setEr] = useState('');
  const [sucs, setSucs] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');
  const dRef = useRef(null);
  const eRef = useRef(null);
  const pRef = useRef(null);
  const cpRef = useRef(null);
  const sbRef = useRef(null);
  const navigate = useNavigate();
  const common =
    'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:border-2 focus:border-blue-500 focus:bg-white';

  useEffect(() => {
    if (sbRef.current) {
      sbRef.current.setAttribute('disabled', true);
    }
  }, []);

  useEffect(() => {
    if (pass.length >= 7 && cpass.length >= 7) {
      if (pass === cpass) {
        sbRef.current.removeAttribute('disabled');
      } else {
        sbRef.current.setAttribute('disabled', true);
      }
    } else {
      sbRef.current.setAttribute('disabled', true);
    }
  }, [pass, cpass]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/signup', {
        displayName: dRef.current.value,
        email: eRef.current.value,
        password: pRef.current.value,
      });
      if (data.msg) {
        setSucs(data.msg);
        setTimeout(() => {
          navigate('/sessions');
        }, 2000);
      }
    } catch (er) {
      if (er.response.data.msg) {
        setEr(er.response?.data?.msg);
      }
      console.log('something went wrong');
    } finally {
      setPass('');
      setCpass('');
      setTimeout(() => {
        setEr('');
        setSucs('');
      }, 2000);
    }
  }
  return (
    <>
      <Nav>
        <Btn text={'Sign up'} href={'/users/new'} />
      </Nav>
      <Main>
        {er ? <Alert error={er} /> : sucs ? <Alert success={sucs} /> : null}
        <form onSubmit={async (e) => await handleSubmit(e)}>
          <div className='w-full max-w-lg'>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-md font-bold mb-2'
                htmlFor='user_display_name'>
                Display name
              </label>
              <Input
                ref={dRef}
                className={common}
                autoFocus={'autoFocus'}
                type={'text'}
                name={'displayName'}
                id={'user_display_name'}
                onChange={(e) =>
                  dRef.current.setAttribute('value', e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className='w-full max-w-lg'>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-md font-bold mb-2'
                htmlFor='user_email'>
                Email
              </label>
              <Input
                ref={eRef}
                className={common}
                type={'email'}
                name={'email'}
                id={'user_email'}
                onChange={(e) =>
                  eRef.current.setAttribute('value', e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className='w-full max-w-lg'>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-md font-bold mb-2'
                htmlFor='user_password'>
                Password
              </label>
              <Input
                ref={pRef}
                className={common}
                minLength='7'
                maxLength='20'
                type={'password'}
                name={'password'}
                id={'user_password'}
                onChange={(e) => {
                  pRef.current.setAttribute('value', e.target.value);
                  setPass(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className='w-full max-w-lg'>
            <div className='w-full px-3'>
              <label
                className='block uppercase tracking-wide text-gray-700 text-md font-bold mb-2'
                htmlFor='user_password_confirmation'>
                Password confirmation
              </label>
              <Input
                ref={cpRef}
                className={common}
                minLength='7'
                maxLength='20'
                type={'password'}
                name={'user[password_confirmation]'}
                id={'user_password_confirmation'}
                onChange={(e) => {
                  cpRef.current.setAttribute('value', e.target.value);
                  setCpass(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className='w-full max-w-lg'>
            <div className='w-full px-3'>
              <Input
                ref={sbRef}
                type={'submit'}
                name={'commit'}
                value={'Sign up'}
                className={
                  'bg-blue-500 disabled:bg-slate-300 disabled:text-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                }
              />
            </div>
          </div>
        </form>
        <h3 className='my-[30px]'>
          Already a memeber?&nbsp;
          <Link to='/sessions' href='/sessions'>
            <span className='font-lg underline'>Sign in </span>
          </Link>
        </h3>
      </Main>
      <Footer />
    </>
  );
}
