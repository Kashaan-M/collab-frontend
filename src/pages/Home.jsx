import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../components/Main';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Btn from '../components/Btn';
import profile from '../assets/profile_placeholder.png';
import comments from '../assets/msg.svg';
import hand from '../assets/joins.svg';
import chevron from '../assets/chev.svg';
import axios from '../api/axios.js';
import { useGlobalContext } from '../context';
import Loadmore from '../components/Loadmore';

export default function Home() {
  const { projects, setProjects, isSignedIn, setProj, agly, setAgly } =
    useGlobalContext();
  const navigate = useNavigate();
  const lmRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('/api/projects');

        if (data.msg) {
          setProjects([...projects, ...data.data]);
        }
      } catch (er) {
        console.log('something went wrong');
      }
    }
    fetchData();
  }, []);

  async function loadMore(e) {
    try {
      const { data } = await axios.post('/api/projects/more', {
        agly,
      });
      if (data.msg) {
        setProjects([...projects, ...data.data]);
        setAgly(agly + 1);
      }
    } catch (er) {
      console.log('something went wrong');
    }
  }
  return (
    <>
      <Nav>
        <Btn
          text={isSignedIn ? 'New Project' : 'Sign up'}
          href={'/users/new'}
        />
        <Link to='/dashboard'>
          <img
            className='w-[40px] h-[40px] rounded-full inline'
            src={profile}
          />
        </Link>
      </Nav>
      <Main>
        <div className='grid grid-cols-1 py-10 mx-auto'>
          {projects &&
            projects.map((project) => {
              const url = encodeURI(`/projects/${project.title}`);
              async function handleClick(e) {
                e.preventDefault();
                setProj(project.id);
                navigate(url);
              }
              return (
                <div
                  className='max-w-lg rounded overflow-hidden shadow-lg my-8 mx-auto py-4'
                  key={project.id}>
                  <div className='flex flex-row justify-between'>
                    <div className='px-6 pt-2 mb-[0px]'>
                      <span className='text-slate-500 text-sm font-thin'>
                        {new Date(project?.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className='px-6 pt-2 mb-[0px]'>
                      <span className='text-slate-500 text-sm font-thin'>
                        @{project?.user?.displayName}
                      </span>
                    </div>
                  </div>

                  <div className='px-6 py-4'>
                    <div className='font-bold text-xl mb-2 flex'>
                      <img
                        className='w-10 h-10 mr-5 rounded-full'
                        src={profile}
                      />

                      <div className='font-bold text-xl mb-2 flex-col'>
                        <button onClick={async (e) => await handleClick(e)}>
                          {project?.title}
                        </button>

                        <p className='text-sm text-gray-500'>
                          <span>{project?.myRole}</span>

                          <span> looking for </span>

                          <span className='underline'>
                            {project?.otherRole}
                          </span>
                        </p>
                      </div>
                    </div>

                    <p className='text-gray-700 text-base pt-10'>
                      {project?.description}
                    </p>
                  </div>

                  <div className='px-6 pb-2 flex justify-between'>
                    <div className='inline'>
                      <div className='inline'>
                        <button onClick={async (e) => await handleClick(e)}>
                          {project?.comments.length != 0
                            ? project.comments.length
                            : 0}
                          <img
                            className='inline w-[25px] h-[25px]'
                            alt='Number of comments'
                            src={comments}
                          />
                        </button>
                      </div>
                      <div className='inline ml-[10px]'>
                        <button onClick={async (e) => await handleClick(e)}>
                          0{' '}
                          <img
                            className='inline w-[25px] h-[25px]'
                            alt='Number of people who applied to join'
                            src={hand}
                          />
                        </button>
                      </div>
                    </div>

                    <div className='inline'>
                      <button onClick={async (e) => await handleClick(e)}>
                        <span className='text-blue-500 hover:text-blue-800'>
                          See more
                        </span>
                        <img className='inline' src={chevron} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Loadmore ref={lmRef} onClick={loadMore} />
      </Main>
      <Footer />
    </>
  );
}
