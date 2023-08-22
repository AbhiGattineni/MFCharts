import { FaTrash } from "react-icons/fa";

export const Timeline = ({ Timelinedata, onDelete }) => {
  return (
    <div className="px-10 overflow-y-auto resize-y h-[190px] mt-3">
      {Timelinedata.length ? (
        <ol className="border-l-2 border-black pl-3 relative">
          {Timelinedata?.map((data, index) => (
            <li className="mb-10 flex items-start" key={index}>
              <div className="absolute left-0 w-3 h-3 bg-black rounded-full mt-1.5 transform -translate-x-2/4 border border-white"></div>
              <div className="flex-grow overflow-hidden">
                <div className="mb-1 text-sm font-semibold text-gray-400">
                  {new Date(data.date).toDateString()}
                </div>
                <p className="mb-2 font-normal">{data.description}</p>
                <a
                  className="text-blue-700 hover:underline block"
                  href={data.url}
                >
                  {data.url}
                </a>
              </div>
              <div className="ml-3">
                <FaTrash
                  className="cursor-pointer"
                  onClick={() => onDelete(data)}
                />
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div>No timedata</div>
      )}
    </div>
  );
};
