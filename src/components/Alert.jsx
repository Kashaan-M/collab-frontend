import { forwardRef } from 'react';
import success from '../assets/success.svg';
import error from '../assets/error.svg';
const Alert = forwardRef(function Alert(props, ref) {
  return (
    <>
      {props.error ? (
        <div className='bg-red-600/[0.4] px-4 py-2 min-w-[100px] w-max flex items-center flex-wrap'>
          <i>
            <img
              src={error}
              alt=''
              width={20}
              height={20}
              className='inline me-2'
            />
          </i>
          <span className='text-lg'>{props.error}</span>
        </div>
      ) : (
        <div className='bg-green-300 px-4 py-2 min-w-[100px] w-max flex items-center flex-wrap'>
          <i>
            <img
              src={success}
              alt=''
              width={20}
              height={20}
              className='inline me-2'
            />
          </i>
          <span className='text-lg'>{props.success}</span>
        </div>
      )}
    </>
  );
});

export default Alert;
