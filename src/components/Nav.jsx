import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
function Nav(props) {
  return (
    <>
      <nav className='flex flex-wrap w-full justify-between items-center py-4'>
        <Link to='/'>
          <header className='ms-4'>
            <h1 className='text-3xl font-bold text-black'>Collab</h1>

            <h2 className='text-3xl font-bold text-black flex justify-center'>
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
        </Link>
        <div className='flex flex-wrap me-4'>{props.children}</div>
      </nav>
    </>
  );
}
export default Nav;
