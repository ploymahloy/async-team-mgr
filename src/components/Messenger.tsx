import { useEffect, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiSendPlaneFill } from 'react-icons/ri';

const threads: string[] = [
  "Cathy Workerson",
  "Abid Jobahava",
  "Max Employerton"
]

export default function Messenger() {
  const [data, setData] = useState();
  
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
                <BsFillPersonFill className='mr-2 p-1 border-2 rounded-full border-sky-600 text-4xl text-sky-600'/>
                <li className="my-3">
                  {title}
                </li>
              </button>
            )
          })}
        </ul>
      </div>
      <div className="w-full flex flex-col bg-zinc-200">
        <div className='grow' />
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

