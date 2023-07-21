import { forwardRef } from 'react';
const Loadmore = forwardRef(function Loadmore(props, ref) {
  async function handleClick(e) {
    try {
    } catch (er) {
      console.log('something went wrong');
    }
  }
  return (
    <div className='w-100 flex justify-center'>
      <button
        className='px-4 py-2 bg-teal-500 font-bold shadow-md shadow-teal-900'
        ref={ref}
        {...props}>
        Load More
      </button>
    </div>
  );
});

export default Loadmore;
