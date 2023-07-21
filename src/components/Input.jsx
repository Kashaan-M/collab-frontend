import { forwardRef } from 'react';

const Input = forwardRef(function Input(props, ref) {
  return (
    <>
      <input {...props} ref={ref} />
    </>
  );
});

export default Input;
