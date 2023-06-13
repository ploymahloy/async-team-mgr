import { useDroppable } from '@dnd-kit/core';
import './Column.css';

type ColumnProps = {
  id: string,
  children: string | JSX.Element
}

export default function Column({id, children}: ColumnProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });

  const style = { backgroundColor: isOver ? 'green' : undefined }
  
  return (
    <div ref={setNodeRef} style={style} className="column">
      {children}
    </div>
  );
}
