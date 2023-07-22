import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Btn from '../components/Btn';
import profile from '../assets/profile_placeholder.png';
import Main from '../components/Main';
import msg from '../assets/msg.svg';
import joins from '../assets/joins.svg';
import axios from '../api/axios';
import { useGlobalContext } from '../context';

export default function Dashboard() {
  const [myProjects, setMyProjects] = useState([]);
  const { user, setUser, setProj } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchMyProjects() {
      try {
        const { data } = await axios.get('/api/projects/myprojects');

        if (data.msg) {
          setMyProjects(data.projects);
          setUser(data.user);
        }
      } catch (er) {
        console.log('something went wrong');
      }
    }
    fetchMyProjects();
  }, []);

  async function handleClick(e, title, id) {
    const url = encodeURI(`/projects/${title}`);
    setProj(id);
    navigate(url);
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
        <div className='mb-[200px]'>
          <div className='flex justify-between max-w-lg'>
            <h2 className='text-3xl font-bold'>Account</h2>
            <button className='text-blue-600'>Edit</button>
          </div>
          {user.length !== 0 && (
            <>
              {/* displayName at index 0; email at index 1*/}
              <p>{user[0]}</p>
              <p>{user[1]}</p>
            </>
          )}

          <h2 className='mt-[50px] text-3xl font-bold'>Projects</h2>
          <div>
            {myProjects.length !== 0 &&
              myProjects.map(({ id, title, comments }) => (
                <article
                  key={id}
                  className='my-4 max-w-lg rounded overflow-hidden shadow-md'>
                  <div className='px-6 py-4'>
                    <div className='font-bold text-xl flex'>
                      <div className='font-bold text-xl flex-col'>
                        <button
                          onClick={async (e) => handleClick(e, title, id)}>
                          <span>{title}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='px-6 pb-2'>
                    <div className='inline'>
                      <span>
                        {comments}
                        <img className='inline w-[25px] h-[25px]' src={msg} />
                      </span>
                    </div>
                    <div className='inline ml-[10px]'>
                      <span>
                        {comments}
                        <img className='inline w-[25px] h-[25px]' src={joins} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
