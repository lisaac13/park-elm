import { useContext } from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

import TransitionContext from '@/lib/context/TransitionContext';

const TransitionComponent = ({ children }) => {
  const pathname= usePathname();
  const { toggleCompleted } = useContext(TransitionContext);
  return (
    <SwitchTransition>
      <Transition
        key={pathname}
        onEnter={(node) => {
          toggleCompleted(false);
          gsap.set(node, { autoAlpha: 0, scale: 1, yPercent: 0 });
          gsap
            .timeline({
              paused: true,
              onComplete: () => toggleCompleted(true),
            })
            .to(node, { autoAlpha: 1, yPercent: 0, duration: 1 })
            .to(node, { scale: 1, duration: 0.5 })
            .play();
        }}
        onExit={(node) => {
          gsap
            .timeline({ paused: true })
            .to(node, { scale: 1, autoAlpha: 0, duration: 0.01 })
            .to(node, { yPercent: 0, autoAlpha: 0, duration: 0.5 })
            .play();
        }}
        timeout={500}
      >
        {children}
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;