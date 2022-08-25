import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import css from '../assets/stylesheets/accordion.module.css';

interface AccordionProps extends PropsWithChildren {
  icon: JSX.Element;
  title: string;
  subTitle: string;
}

function Accordion(props: AccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  const ref = useRef<HTMLDivElement | null>(null);
  const { children, icon, title, subTitle } = props;
  const height = expanded ? maxHeight : 0;
  const className = css.root + (expanded ? ` ${css.open}` : '');

  const onTriggerClick = () => setExpanded((prev) => !prev);

  useEffect(() => {
    const newMaxHeight = ref.current?.scrollHeight || 0;
    if (maxHeight !== newMaxHeight) setMaxHeight(newMaxHeight);

    window.addEventListener('resize', () => setMaxHeight(newMaxHeight));
    return () =>
      window.removeEventListener('resize', () => setMaxHeight(newMaxHeight));
  }, [maxHeight, setMaxHeight]);

  return (
    <div className={className}>
      <button
        className={css.trigger}
        style={{ borderBottom: expanded ? '' : 'none' }}
        onClick={onTriggerClick}
      >
        {icon}
        <div>
          <strong>{title}</strong>
          <small>{subTitle}</small>
        </div>
      </button>

      <div ref={ref} className={css.collapse} style={{ maxHeight: height }}>
        {children}
      </div>
    </div>
  );
}

export default Accordion;
