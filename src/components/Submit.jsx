import { forwardRef } from 'react';

const Submit = forwardRef(function Submit(props, ref) {
  const { value, classes } = props;
  return (
    <input
      type='submit'
      className={`px-3 py-2 bg-sky-300 hover:bg-sky-400 disabled:bg-gray-300 disabled:text-gray-700 disabled:shadow-none shadow-sm shadow-cyan-700 font-bold ${classes}`}
      value={value}
      ref={ref}
    />
  );
});

export default Submit;
