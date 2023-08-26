import { Dispatch, createContext, useContext, useReducer } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DropResult {
  name: string;
  panelName: string;
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
    targetType: TargetType;
  }
}

type TargetType
  = 'name' | 'panelName' // Items | Panel

interface ItemsContextType {
  items: ItemsData;
  dispatch: Dispatch<ItemsReducerAction>;
}

const initialItems: ItemsData = {
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

const ItemTypes = {
  ITEM: 'item',
};

const ACTIONS = {
  MOVE: 'move',
};

const ItemsContext = createContext<ItemsContextType>({
  items: initialItems,
  dispatch: () => { }
});

function itemsReducer(state: ItemsData, action: ItemsReducerAction) {
  switch (action.type) {
    case ACTIONS.MOVE:
      const { id, source, target, targetType } = action.payload;
      const newState: ItemsData = { ...state };
      const position = newState[source].findIndex((item) => item.id === id);
      let newTarget;

      if (position === -1) return newState;

      if (targetType === "panelName") {
        newTarget = target.toLowerCase() as keyof ItemsListTypes;
      } else newTarget = target;

      // add to new list
      newState[newTarget]?.push(newState[source][position]);

      // remove from old list
      newState[source]?.splice(position, 1);

      return newState;
    default:
      return state;
  }
}

function Item(props: ItemProps) {
  const { sourceList, item } = props;

  const theItemsContext = useContext(ItemsContext);
  const { dispatch } = theItemsContext;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: { id: item.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      let targetName, targetType;

      if (dropResult?.name) {
        targetName = dropResult.name;
        targetType = "name";
      } else {
        targetName = dropResult?.panelName;
        targetType = "panelName";
      }

      if (dropResult) {
        dispatch({
          type: 'move',
          payload: {
            id: item.id,
            source: sourceList,
            target: targetName as keyof ItemsListTypes,
            targetType: targetType as TargetType
          }
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      className='p-2 my-2 bg-white rounded-sm drop-shadow-md'
      ref={drag}
    >
      {item.name}
    </div>
  );
}

function Items(props: ItemsProps) {
  const { name } = props;
  const { items } = useContext(ItemsContext);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: () => {
      return { name }
    },
    collect: (...args) => {
      const monitor = args[0];
      return {
        isOver: monitor.isOver()
      }
    }
  }), [name, items]);

  return (
    <div
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

const Panel = ({ children, panelName }: any) => {
  const { items } = useContext(ItemsContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: () => {
      return { panelName }
    },
    collect: (...args) => {
      const monitor = args[0];
      return {
        isOver: monitor.isOver()
      }
    }
  }), [items, panelName]);

  return (
    <div
      className={`w-[300px] rounded-md p-3 ${isOver ? 'bg-blue-200' : 'bg-neutral-200'}`}
      ref={drop}
    >
      {children}
    </div>
  )
};

export default function Board() {
  const [items, dispatch] = useReducer(itemsReducer, initialItems);

  return (
    <main className='h-[calc(100vh-40px)] flex flex-row justify-center gap-2 p-3 pb-5 bg-sky-600'>
      <DndProvider backend={HTML5Backend}>
        <ItemsContext.Provider value={{ items, dispatch }}>
          <Panel panelName="Todo">
            <h3 className='text-xl'>Todo</h3>
            <Items name="todo" />
          </Panel>
          <Panel panelName="Doing">
            <h3 className='text-xl'>Doing</h3>
            <Items name="doing" />
          </Panel>
          <Panel panelName="Done">
            <h3 className='text-xl'>Done</h3>
            <Items name="done" />
          </Panel>
        </ItemsContext.Provider>
      </DndProvider>
    </main>
  );
}
