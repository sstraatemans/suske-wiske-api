import { FC, forwardRef } from 'react';
import { useSpring, animated } from 'react-spring';

type Props = {
  in: boolean;
  onEnter?: () => void;
  onExited?: () => void;
};

const Fade: FC<Props> = ({ in: open, children, onEnter, onExited, ...props }) => {
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div style={style} {...props}>
      {children}
    </animated.div>
  );
};

export default Fade;
