import { useState } from "react";

const navList = [
  'Team',
  'Schedule Sync',
  'Calendar',
  'Messenger',
  'Kanban'
]

export default function Navbar() {
  const [isActive, setIsActive] = useState(true);

  const handleDropDown = () => {
    isActive
      ? setIsActive(false)
      : setIsActive(true);
  }

  return (
    <>
      <div className="flex justify-between items-center leading-[2.5rem] bg-sky-600 text-white pl-3">
        <div>
          {navList.map((link, index) => {
            return (
              <a key={index} className="inline-block mr-6 align-center" href="#">
                {link}
              </a>
            )
          })}
        </div>
        <a
          href="#"
          className="px-6"
          onClick={() => handleDropDown()}
        >
          User name
        </a>
      </div>

      {/* Dropdown Menu */}
      <div className={isActive ? "hidden" : "absolute" + " right-0 flex justify-end"}>
        <div className="w-fit px-6 py-2 bg-sky-600 text-white text-right">
          <a href="#" className="block p-2 text-center">Settings</a>
          <a href="#" className="block p-2 text-center">Log Out</a>
        </div>
      </div>
    </>
  );
}
