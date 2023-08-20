import { useDrag } from 'react-dnd';

interface ItemProps { text: string; }

export default function Item({ text }: ItemProps) {
  const [, drag] = useDrag(() => ({
    type: "Card",
    item: { text },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.text} into ${dropResult}!`)
        console.log(item.text, dropResult)
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }))


  return (
    <div
      ref={drag}
      className='bg-white border-2 border-gray-700 rounded-sm text-center mb-3 pt-1 h-10 hover:bg-gray-200 cursor-move'>
      {text}
    </div>
  );
}
