import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Main from '../components/Main';
import { role_options, purpose_options } from '../utils/options';
import Input from '../components/Input';
import Btn from '../components/Btn';
import profile from '../assets/profile_placeholder.png';
import axios from '../api/axios';
import Alert from '../components/Alert';
import { useGlobalContext } from '../context';

export default function CreateProject(props) {
  const [er, setEr] = useState('');
  const [sucs, setSucs] = useState('');
  const navigate = useNavigate();
  const oRef = useRef(null);
  const uRef = useRef(null);
  const tRef = useRef(null);
  const dRef = useRef(null);
  const pRef = useRef(null);
  const { setProj } = useGlobalContext();

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      role_options.find((o) => o.name === oRef.current.value) == undefined ||
      role_options.find((u) => u.name === uRef.current.value) == undefined ||
      purpose_options.find((p) => p.name === pRef.current.value) == undefined
    ) {
      return;
    }
    try {
      const { data } = await axios.post('/api/projects', {
        ownRole: oRef.current.value,
        otherRole: uRef.current.value,
        title: tRef.current.value,
        description: dRef.current.value,
        purpose: pRef.current.value,
      });

      if (data.msg) {
        setSucs(data.msg);
        const { username, email, title, project } = data.project;
        const encoded = encodeURI(`/projects/${title}`);
        sessionStorage.setItem('proj', project);
        setProj(project);
        setTimeout(() => {
          navigate(encoded);
        }, 2000);
      }
    } catch (er) {
      if (er?.response?.data?.msg) {
        setEr(er.response?.data?.msg);
      }
      console.log('something went wrong', er);
    } finally {
      setTimeout(() => {
        setEr('');
        setSucs('');
      }, 2000);
    }
  }
  async function setTest(e) {
    e.preventDefault();
    try {
      const { data } = await axios.get('/api/test', { withCredentials: true });
    } catch (er) {
      console.log(er);
    }
  }
  return (
    <>
      <Nav>
        <Btn text={'New Project'} href={'/projects/new'} />
        <Link to='/dashboard'>
          <img
            className='w-[40px] h-[40px] rounded-full inline'
            src={profile}
          />
        </Link>
      </Nav>
      <Main>
        {er ? <Alert error={er} /> : sucs ? <Alert success={sucs} /> : null}
        <button onClick={async (e) => await setTest(e)}>TEST</button>
        <form onSubmit={async (e) => await handleSubmit(e)}>
          <div className='rounded overflow-hidden shadow-lg my-8 mx-auto p-10'>
            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2'
                  htmlFor='grid-state'>
                  I&apos;m a
                </label>
                <div className='relative'>
                  <select
                    ref={oRef}
                    name='project[am_role_id]'
                    id='project_am_role_id'
                    className='block  w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500 text-xl'
                    required
                    onChange={(e) => {
                      e.target.setAttribute('value', e.target.value);
                    }}>
                    {role_options.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2'
                  htmlFor='grid-state'>
                  Looking for a
                </label>
                <div className='relative'>
                  <select
                    ref={uRef}
                    name='project[looking_for_role_id]'
                    id='project_looking_for_role_id'
                    className='block w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500 text-xl'
                    required
                    onChange={(e) => {
                      e.target.setAttribute('value', e.target.value);
                    }}>
                    {role_options.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className='flex flex-wrap -mx-3 my-6'>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2'
                  htmlFor='grid-password'>
                  Title
                </label>
                <Input
                  ref={tRef}
                  name='project[title]'
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  type='text'
                  maxLength='150'
                  placeholder='Something short &amp; descriptive'
                  onChange={(e) => {
                    e.target.setAttribute('value', e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className='flex flex-wrap -mx-3 my-6'>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2'
                  htmlFor='grid-password'>
                  Tell us more
                </label>
                <textarea
                  ref={dRef}
                  className='h-96 form-control appearance-none block text-xl w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  placeholder='Tell us as much as you want about the project, and anything relevant to someone you would work with.'
                  name='project[description]'
                  id='project_description'
                  onChange={(e) => {
                    e.target.setAttribute('value', e.target.value);
                  }}
                  required></textarea>
              </div>
            </div>

            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2'
                  htmlFor='grid-city'>
                  Purpose
                </label>
                <select
                  ref={pRef}
                  name='project[purpose_id]'
                  id='project_purpose_id'
                  className='block w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500 text-xl'
                  required
                  onChange={(e) => {
                    e.target.setAttribute('value', e.target.value);
                  }}>
                  {purpose_options.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <input
              type='submit'
              name='commit'
              value='Lez go ✨'
              className='bg-teal-600 hover:bg-teal-400 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10'
              data-disable-with='Lez go ✨'
            />
          </div>
        </form>
      </Main>
    </>
  );
}
