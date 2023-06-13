import { useDraggable } from '@dnd-kit/core';

type ItemProps = {
  id: string,
  children: string | JSX.Element
}

export default function Item({ id, children }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      className="Item"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
