const navList = [
  'Team',
  'Schedule Sync',
  'Calendar',
  'Messenger',
  'Kanban',
  'Log Out'
]

export default function Navbar() {
  return (
    <div className="leading-[2.5rem]">
      {navList.map((link, index) => {
        return (
          <a key={index} className="inline-block mx-3 align-center" href="#">
            {link}
          </a>
        )
      })}
    </div>
  );
}
