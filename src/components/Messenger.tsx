import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useRef,
  useState
} from 'react';

import { BsFillPersonFill } from 'react-icons/bs';
import { PiNotePencil } from 'react-icons/pi';
import { RiSendPlaneFill } from 'react-icons/ri';

interface MessagesType {
  id: number,
  // time
  // authorName
  flow: string,
  body: string
}

const starterThreads: string[] = [
  "Cathy Workerson",
  "Abid Jobahava",
  "Max Employerton"
]

const fakeMessages: MessagesType[] = [
  {
    id: 0,
    flow: "incoming",
    body: "Gee whiz! I am SO glad that I started using this app."
  },
  {
    id: 1,
    flow: "outgoing",
    body: "Right?! I was wasting so much time trying to keep meetings together with our team due to the different timezones involved."
  },
  {
    id: 2,
    flow: "outgoing",
    body: "Now I don't even have to think about it!"
  },
  {
    id: 3,
    flow: "incoming",
    body: "Me neither! Now we can work with any developer we want without worrying about timezone conflicts!"
  }
]

export default function Messenger() {
  const [messages, setMessages] = useState(fakeMessages);
  const [threads, setThreads] = useState(starterThreads);
  const [textareaHeight, setTextareaHeight] = useState(1);
  const [draft, setDraft] = useState('');

  const searchRef = useRef<HTMLInputElement>(null);

  // Search Logic
  const handleInput = () => {
    if (searchRef.current) {
      let searchStr = searchRef.current.value.toLowerCase();
      let threadsSearched = [];

      for (let i = 0; i < starterThreads.length; i++) {
        if (starterThreads[i].toLowerCase().includes(searchStr)) {
          threadsSearched.push(starterThreads[i]);
        }
      }

      setThreads(threadsSearched);
    }
  };

  // TextArea Resizing
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(e.target.value);

    const height = e.target.scrollHeight;
    const rowHeight = 25;
    const trows = Math.ceil(height / rowHeight) - 1;

    if (trows && textareaHeight) { setTextareaHeight(trows) };
  };

  // Send Message
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (draft !== '') {

      const newMessage = {
        id: messages.length - 1,
        flow: "outgoing",
        body: draft
      }

      setMessages((prev) => {
        return [...prev, newMessage]
      })

      setDraft('');
      setTextareaHeight(1);
    }
  }

  return (
    <div className="box-border flex h-[calc(100vh-40px)]">
      <div className="min-w-[320px] flex flex-col bg-neutral-500">

        <p className="text-2xl mt-3 text-center text-white">Messages</p>

        {/* Search Bar and New Thread Button */}
        <div className='flex items-center m-3'>
          <input
            ref={searchRef}
            onChange={handleInput}
            placeholder="Search messages"
            className="grow px-2 py-1 rounded-lg focus:border-none focus:outline-none"
          />
          <button className="flex justify-center items-center ml-3 h-10 w-10 rounded-full bg-sky-600 active:bg-sky-500 text-white text-2xl">
            <PiNotePencil />
          </button>
        </div>

        {/* Open Threads */}
        <ul className='w-full overflow-scroll'>
          {threads.length > 0
            ? threads.map((name, index) => {
              return (
                <button key={index} className='flex items-center w-full pl-3 bg-transparent hover:bg-neutral-400'>
                  <BsFillPersonFill className='mr-2 p-1 border-2 rounded-full border-white text-4xl text-white' />
                  <li className="my-3 text-white">
                    {name}
                  </li>
                </button>
              )
            })
            : <li className='text-center text-white'>No results found</li>
          }
        </ul>

      </div>
      <div className="w-full flex flex-col justify-end bg-zinc-800">

        {/* Thread Messages */}
        <div className='p-3 pb-0 overflow-scroll'>
          {messages.map(({ id, flow, body }, index) => {
            return (
              <div key={index} className={'flex ' + (flow === "outgoing"
                ? 'justify-end'
                : 'justify-start'
              )}>
                <div
                  key={id}
                  className={'max-w-[55%] my-1 px-2 py-1 rounded-lg text-white break-words whitespace-pre-wrap '
                    + (flow === "outgoing"
                      ? 'bg-sky-600'
                      : 'bg-zinc-500'
                    )}
                >
                  {body}
                </div>
              </div>
            );
          })}
        </div>
        <form className="flex justify-center items-center mb-1 p-3 bg-transparent">

          {/* Compose Message & Send Button */}
          <textarea
            rows={textareaHeight}
            onInput={(e: FormEvent<HTMLTextAreaElement>) => {
              handleContentChange(e as ChangeEvent<HTMLTextAreaElement>)
            }}
            value={draft}
            className="w-[30vw] max-w-xl mr-3 px-2 py-1 bg-white rounded-md outline-none resize-none"
          />
          <button
            type='submit'
            onClick={(e) => handleButtonClick(e)}
            className='inline-block h-11 p-3 rounded-full bg-sky-600 active:bg-sky-500'
          >
            <RiSendPlaneFill className='text-xl text-white' />
          </button>

        </form>
      </div>
    </div>
  )
}
