import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

export default function Footer() {
  const { isSignedIn } = useGlobalContext();
  return (
    <footer className='bg-white rounded-lg shadow dark:bg-gray-900 m-4 mt-[300px]'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between flex-wrap'>
          <div className='flex justify-between flex-wrap w-full'>
            <header>
              <h1 className='text-3xl font-bold text-white'>Collab</h1>

              <h2 className='text-3xl font-bold text-white flex justify-center'>
                <img
                  src={logo}
                  width={32}
                  height={32}
                  className='inline'
                  alt=''
                />
                Match
              </h2>
            </header>
            <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
              {isSignedIn && (
                <li>
                  <Link to='/signout'>
                    <span className='mr-4 hover:underline md:mr-6'>
                      Sign out
                    </span>
                  </Link>
                </li>
              )}
              <li>
                <Link to='/'>
                  <span className='mr-4 hover:underline md:mr-6'>About</span>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <span className='mr-4 hover:underline md:mr-6'>
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <span className='mr-4 hover:underline md:mr-6'>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className='w-full'>
            <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
            <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
              © 2023&nbsp;
              <Link to='/'>
                <span className='hover:underline '>CollabMatch.co</span>
              </Link>
              &nbsp;All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
