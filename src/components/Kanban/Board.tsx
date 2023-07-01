import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Column from './Column';

export default function Board() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className='h-[94vh] bg-gray-300 flex flex-row justify-center gap-2 p-3'>
        <Column />
        <Column />
        <Column />
      </main>
    </DndProvider>
  );
}
