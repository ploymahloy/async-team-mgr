import { useEffect, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiSendPlaneFill } from 'react-icons/ri';

interface MessagesType {
  id: number,
  // time
  // authorName
  flow: string,
  body: string
}

const threads: string[] = [
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
    body: "Me neither! Now we can work any developer we want without worrying about timezone conflicts!"
  }
]

export default function Messenger() {
  const [_data, setData] = useState();
  const [messages, setMessages] = useState(fakeMessages);

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(apiData => setData(apiData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="box-border flex h-[calc(100vh-40px)]">
      <div className="min-w-[220px]">
        <p className="text-2xl my-5 text-center">Messages</p>
        <ul>
          {threads.map((title, index) => {
            // if (data) {
            //   console.log("Thumbnail: ", data.results[0].picture.thumbnail);
            //   console.log("First: ", data.results[0].name.first);
            //   console.log("Last: ", data.results[0].name.last);
            // }

            return (
              <button key={index} className='flex items-center w-full pl-3 hover:bg-zinc-200'>
                <BsFillPersonFill className='mr-2 p-1 border-2 rounded-full border-sky-600 text-4xl text-sky-600' />
                <li className="my-3">
                  {title}
                </li>
              </button>
            )
          })}
        </ul>
      </div>
      <div className="w-full flex flex-col bg-zinc-200">
        <div className='grow p-3 overflow-scroll'>
          {messages.map(({ id, flow, body }) => {
            return (
              <div className={'flex ' + (flow === "outgoing"
                ? 'justify-end'
                : 'justify-start'
              )}>
                <div
                  key={id}
                  className={'w-fit max-w-[45%] my-1 px-2 py-1 rounded-xl text-white ' + (flow === "outgoing"
                    ? 'bg-sky-600'
                    : 'bg-zinc-400'
                  )}
                >
                  {body}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center p-3 bg-transparent">

          {/* Compose Message & Send Button */}
          <div
            contentEditable={true}
            className="w-[30vw] max-w-xl mr-3 p-2 bg-white rounded-md outline-none"
          />
          <button className='inline-block h-11 bg-sky-600 active:bg-sky-500 rounded-full p-3'>
            <RiSendPlaneFill className='text-xl text-white' />
          </button>

        </div>
      </div>
    </div>
  )
}

