'use client';

import { Dispatch, createContext, useContext, useReducer } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DropResult {
  name: string;
}

interface ItemsListTypes {
  todo: string,
  doing: string,
  done: string,
}

type ItemsEntry = { id: number, name: string };
type ItemsList = ItemsEntry[];
type ItemsData = { [key in keyof ItemsListTypes]: ItemsList };

type ItemProps = {
  sourceList: keyof ItemsListTypes;
  item: ItemsEntry;
}

type ItemsProps = {
  name: keyof ItemsListTypes;
}

type ItemsReducerAction = {
  type: string;
  payload: {
    id: number;
    source: keyof ItemsListTypes;
    target: keyof ItemsListTypes;
  }
}

interface ItemsContext {
  items: ItemsData;
  dispatch: Dispatch<ItemsReducerAction>;
}

const initialItems: ItemsData = {
  // assumption: the are no duplicate values
  todo: [
    { id: 1, name: 'Take out the trash' },
    { id: 2, name: 'Cook dinner' }
  ],
  doing: [
    { id: 3, name: 'Do homework' },
    { id: 4, name: 'Call mom' }
  ],
  done: [
    { id: 5, name: 'Water the plants' },
    { id: 6, name: 'Cry' }
  ],
};

const ItemsContext = createContext<ItemsContext>({
  items: initialItems,
  dispatch: () => { }, // I don't love this
});

const ItemTypes = {
  ITEM: 'item',
};

function Item(props: ItemProps) {
  console.log("Item props: ", props);
  const { sourceList, item } = props;

  const theItemsContext = useContext(ItemsContext);
  const { dispatch } = theItemsContext;
  console.log("dispatch: ", theItemsContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { id: item.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      console.log("useDrag > dropResult: ", dropResult);
      // if null, dropResult no dispatch is called because nothing is dropped?

      if (dropResult) {
        dispatch({
          type: 'move',
          payload: {
            id: item.id,
            source: sourceList,
            target: dropResult?.name as keyof ItemsListTypes,
            // # Drag but no drop: why does it still delete
            // end?
          },
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className={`item ${isDragging ? 'bg-red-500' : 'bg-white'}`}
      ref={drag}
    >
      {item.name}
    </div>
  );
}

function Items(props: ItemsProps) {
  const { name } = props;
  const { items } = useContext(ItemsContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: (item, monitor) => {
      // console.log("Drop > Item, Monitor: ", item, monitor);
      return { name }
    },
    collect: (...args) => {
      // console.log("useDrop > collect > args: ", args);
      const monitor = args[0];
      return {
        isOver: monitor.isOver() // # are you over me or the parent (grey doesn't work)
      }
    }
  }), [name, items]);

  // console.log("Items :", items);
  return (
    <div
      className={`items ${isOver ? 'bg-green-500' : ''}`}
      ref={drop}
    >
      {items[name].map((item) => (
        <Item
          key={item.id}
          item={item}
          sourceList={name}
        />
      ))}
    </div>
  );
}

const ACTIONS = {
  MOVE: 'move',
};

function itemsReducer(state: ItemsData, action: ItemsReducerAction) {
  switch (action.type) {
    case ACTIONS.MOVE:
      const { id, source, target } = action.payload;
      const newState: ItemsData = { ...state };

      // console.log("actions: ", action);

      // find position is original list
      const position = newState[source].findIndex((item) => item.id == id);

      if (position === -1) return newState;

      // add to new list
      newState[target]?.push(newState[source][position]);

      // remove from old list
      // console.log("newState position: ", position);  = 0 | 1
      newState[source]?.splice(position, 1);

      return newState;
    default:
      return state;
  }
}

export default function Board() {
  const [items, dispatch] = useReducer(itemsReducer, initialItems);
  // console.log("Board items: ", items);

  return (
    <main className='h-[94vh] flex flex-row justify-center gap-2 p-3'>
      <DndProvider backend={HTML5Backend}>
        <ItemsContext.Provider value={{ items, dispatch }}>
          <div className='w-[300px] bg-gray-400 border-2 border-gray-500 rounded-md p-3'>
            <h3 className='text-center'>Todo</h3>
            <Items name="todo" />
          </div>
          <div className='w-[300px] bg-gray-400 border-2 border-gray-500 rounded-md p-3'>
            <h3 className='text-center'>Doing</h3>
            <Items name="doing" />
          </div>
          <div className='w-[300px] bg-gray-400 border-2 border-gray-500 rounded-md p-3'>
            <h3 className='text-center'>Done</h3>
            <Items name="done" />
          </div>
        </ItemsContext.Provider>
      </DndProvider>
    </main>
  );
}
