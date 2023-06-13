import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import Column from './Column';
import Item from './Item';

export default function Board() {
  const [parent, setParent] = useState(null);
  const containers = ['A', 'B', 'C', 'D', 'E'];
  const draggableMarkup = <Item id="draggable">Drag me</Item>;

  function handleDragEnd(event: any) {
    const { over } = event;
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}
      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Column key={id} id={id}>
          {parent === id ? draggableMarkup : `${id}`}
        </Column>
      ))}
    </DndContext>
  );
};
