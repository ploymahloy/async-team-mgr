import { useState } from 'react';
import { useDrop } from 'react-dnd';

interface ColumnProps {children: JSX.Element[]}

export default function Column({children}: ColumnProps) {
  const [_hasDropped, setHasDropped] = useState(false)

  const [, drop] = useDrop(() => ({
    accept: "Card",
    drop(_item: unknown, monitor) {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      setHasDropped(true);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }), [setHasDropped])
    
  return (
    <div
      ref={drop}
      className='w-[300px] bg-gray-400 border-2 border-gray-500 rounded-md p-3'
    >
      {children}
    </div>
  );
}
