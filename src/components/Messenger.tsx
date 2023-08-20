import { Fragment } from 'react';

const threads: string[] = [
  "Cathy Workerson",
  "Abid Jobahava",
  "Max Employerton"
]

export default function Messenger() {
  return (
    <div className="box-border flex h-[94vh]">
      <div className="min-w-[220px] text-center">
        <p className="text-3xl my-5">Team Name</p>
        <ul>
          {threads.map((title, index) => {
            return (
              <Fragment key={index}>
                <li className="my-3">
                  {title}
                </li>
              </Fragment>
            )
          })}
        </ul>
      </div>
      <div className="w-full flex flex-col">
        <div className='grow bg-sky-600'></div>
        <div className="flex justify-center items-center">
          <textarea className="w-[500px] m-3 p-3 resize-none border-2 border-black rounded-md" />
          <button className="h-fit p-2 border-2 border-black rounded-md">Send</button>
        </div>
      </div>
    </div>
  )
}

