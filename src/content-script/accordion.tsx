import { ChevronUpIcon } from '@primer/octicons-react';
import { useEffect, useState } from 'preact/hooks';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  visible: boolean;
};

export default function Accordion({ children, visible }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof visible === 'boolean') setIsVisible(visible);
  }, [visible]);

  return (
    <>
      <button
        className="toggle-button h-8 w-full box-border border-none colab-border-bottom colab-background p-0 outline-none cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        <div className="h-8 flex items-center justify-between px-3">
          <span className="text-md colab-text">{isVisible ? 'Hide' : 'Show ChatGPT'}</span>
          <span
            style={{
              transform: `rotate(${isVisible ? 0 : 180}deg)`,
            }}
          >
            <ChevronUpIcon className="colab-text" size={16} />
          </span>
        </div>
      </button>
      <div
        className={`${isVisible ? 'visible max-h-[1000px]' : 'overflow-hidden max-h-0'} mb-2`}
        style={{
          transition: 'max-height 300ms ease-in-out',
        }}
      >
        {children}
      </div>
    </>
  );
}
