const threads: string[] = [
  "Cathy Workerson",
  "Abid Jobahava",
  "Max Employerton"
]

const blocks: JSX.Element[] = [];
for (let i = 1; i <= 48; i++) {
  blocks.push(<button key={i} className="h-10 grow mr-1 border rounded-md overflow-hidden hover:bg-green-500" />);
}

export default function ScheduleSync() {
  return (
    <div className='h-[94vh]'>
      <p className="text-center text-2xl">Schedule Sync</p>
      <div className="mx-20">
        {threads.map((name) => {
          return (
            <>
              <div>{name}</div>
              <div className="w-100 flex grow">
                {blocks}
              </div>
            </>
          )
        })}
      </div>
    </div>
  );
}
