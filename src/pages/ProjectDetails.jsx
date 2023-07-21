import { useEffect, useRef } from 'react';
import Main from '../components/Main';
import Nav from '../components/Nav';
import { useGlobalContext } from '../context';
import share from '../assets/share_icon.svg';
import bookmark from '../assets/bookmark.svg';
import hand from '../assets/joins.svg';
import profile from '../assets/profile_placeholder.png';
import axios from '../api/axios';
import Btn from '../components/Btn';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function ProjectDetails() {
  const { detail, proj, setDetail, projects } = useGlobalContext();
  const cRef = useRef(null);

  useEffect(() => {
    async function fetchProjectDetail() {
      if (projects.length != 0) {
        const our = projects.find((project) => project.id == proj);
        if (our) {
          setDetail(our);
          return;
        }
      }
      try {
        const project = proj || sessionStorage.getItem('proj');

        const { data } = await axios.post('/api/projects/project/detail', {
          project,
        });

        console.log('data', data);
        if (data.msg) {
          setDetail(data.detail);
        }
      } catch (er) {
        console.log('something went wrong');
      }
    }
    fetchProjectDetail();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const project = proj || sessionStorage.getItem('proj');
      const { data } = await axios.post('/api/comment', {
        project,
        comment: cRef.current.value,
      });
    } catch (er) {
      console.log('something went wrong');
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
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between max-w-xl mx-auto w-full md:px-[30px]'>
            <div>
              <span className='cursor-pointer'>
                <img
                  className='inline w-[30px] h-[30px]'
                  alt='Share'
                  src={bookmark}
                />
              </span>
              <span className='cursor-pointer'>
                <img
                  className='inline w-[30px] h-[30px]'
                  alt='Share'
                  src={share}
                />
              </span>
            </div>
            <div>
              <button>
                0
                <img
                  className='inline w-[30px] h-[30px]'
                  alt='Share'
                  src={hand}
                />
              </button>
            </div>
          </div>
          {detail && (
            <>
              <div className='max-w-lg rounded overflow-hidden shadow-lg my-8 mx-auto py-4'>
                <div className='px-6 pt-2 pb-2'>
                  <div className='flex justify-between'>
                    <div className='mb-[0px]'>
                      <span className='text-slate-500 text-sm font-thin'>
                        {new Date(detail?.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <span className='text-slate-500 text-sm font-thin'>
                      @{detail?.username}
                    </span>
                  </div>
                </div>
                <div className='px-6 py-4'>
                  <div className='font-bold text-xl mb-2 flex'>
                    <div className='flex flex-col'>
                      <img
                        className='w-10 h-10 mr-5 rounded-full'
                        src={profile}
                        alt={`${detail?.user} profile pic`}
                      />
                    </div>

                    <div className='font-bold text-xl mb-2 flex-col'>
                      {detail?.title}
                      <p className='text-sm text-gray-500'>
                        <span>{detail?.ownRole}</span>
                        <span> looking for </span>
                        <span className='underline'>{detail?.otherRole}</span>
                      </p>
                    </div>
                  </div>
                  <p className='text-gray-700 text-base pt-10'>
                    {detail?.description}
                  </p>
                </div>
              </div>

              <div className='max-w-lg w-full mx-auto'>
                <section className='py-8 lg:py-16'>
                  <div className='mx-auto px-4'>
                    <div className='flex items-center mb-6'>
                      <h2 className='text-lg lg:text-2xl font-bold text-gray-900'>{`Discussion (${
                        detail.comments ? detail.comments.length : 0
                      })`}</h2>
                    </div>

                    <form onSubmit={async (e) => await handleSubmit(e)}>
                      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 w-full bg-[#dddddd59]'>
                        <label htmlFor='comment' className='sr-only'>
                          Your comment
                        </label>
                        <textarea
                          ref={cRef}
                          id='comment'
                          rows='3'
                          name='comment'
                          className='px-0 w-full min-w-full text-m border-0 focus:ring-0 focus:outline-none placeholder-gray-600 bg-transparent'
                          placeholder='Write a comment...'
                          required
                          onChange={(e) =>
                            e.target.setAttribute('value', e.target.value)
                          }></textarea>
                      </div>
                      <button
                        type='submit'
                        className='inline-flex mb-[50px] items-center py-2.5 px-4 text-lg font-large text-center bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'>
                        Post comment
                      </button>
                    </form>
                    {detail.comments
                      ? detail?.comments.map((c) => (
                          <article
                            className='p-6 mb-6 text-base bg-[#dddddd59] rounded-lg'
                            key={c.comment}>
                            <footer className='flex justify-between items-center mb-2'>
                              <div className='flex items-center'>
                                <p className='inline-flex items-center mr-3 text-m'>
                                  <img
                                    className='w-10 h-10 mr-5 rounded-full'
                                    src={profile}
                                    alt={`${c.user?.displayName} profile pic`}
                                  />
                                  {c.user?.displayName}
                                </p>
                              </div>
                            </footer>
                            <p className='text-slate-950'>{c?.comment}</p>
                          </article>
                        ))
                      : null}
                  </div>
                </section>
              </div>
            </>
          )}
        </div>
      </Main>
      <Footer />
    </>
  );
}
