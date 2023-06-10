import { ChevronUpIcon } from '@primer/octicons-react';
import { useEffect, useState } from 'preact/hooks';
import { ReactNode } from 'react';
import useDynamicMaxHeight from './use-dynamic-max-height';

type Props = {
  children: ReactNode;
  visible: boolean;
};

export default function Accordion({ children, visible }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof visible === 'boolean') setIsVisible(visible);
  }, [visible]);

  const { ref, contentHeight } = useDynamicMaxHeight();

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
        ref={ref}
        className={`${isVisible ? `visible` : 'overflow-hidden max-h-0'} mb-2`}
        style={{
          transition: 'max-height 200ms ease-in-out',
          maxHeight: isVisible ? `${Math.max(contentHeight ?? 0, 1000)}px` : 0,
        }}
      >
        {children}
      </div>
    </>
  );
}
