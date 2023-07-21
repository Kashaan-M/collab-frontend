import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Btn = forwardRef(function Btn(props, ref) {
  const navigate = useNavigate();

  const { text, id, classes, href, replace } = props;
  const btnClasses =
    'gradient-hover-effect shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-500/50';
  return (
    <button
      className={classes ? btnClasses + ' ' + classes : btnClasses}
      ref={ref}
      id={id ? id : ''}
      onClick={(e) => {
        if (replace) {
          navigate(href, { replace: true });
        } else {
          navigate(href);
        }
      }}>
      {text && text}
    </button>
  );
});
export default Btn;
