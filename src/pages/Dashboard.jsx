import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Btn from '../components/Btn';
import profile from '../assets/profile_placeholder.png';
import Main from '../components/Main';
import msg from '../assets/msg.svg';
import joins from '../assets/joins.svg';

export default function Dashboard() {
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
          <p>dimash</p>
          <p>dimashstudio@gmail.com</p>

          <h2 className='mt-[50px] text-3xl font-bold'>Projects</h2>
          <div className='max-w-lg rounded overflow-hidden shadow-lg'>
            <div className='px-6 py-4'>
              <div className='font-bold text-xl flex'>
                <div className='font-bold text-xl flex-col'>
                  <a href='/projects/0feb4f53f8f6df9d62c17c9995ba265b'>
                    testing collab match
                  </a>
                </div>
              </div>
            </div>

            <div className='px-6 pb-2'>
              <div className='inline'>
                <span>
                  12 <img className='inline w-[25px] h-[25px]' src={msg} />
                </span>
              </div>
              <div className='inline ml-[10px]'>
                <span>
                  2 <img className='inline w-[25px] h-[25px]' src={joins} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}
