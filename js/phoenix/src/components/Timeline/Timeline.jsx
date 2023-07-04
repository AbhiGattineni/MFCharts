export const Timeline = ({ Timelinedata }) => {
    console.log("length", Timelinedata.length);
    return (
        <div className="p-10 overflow-y-auto h-64">
            {Timelinedata.length > 0 ?
                <ol className="relative border-l border-l-2 border-black">
                    {
                        Timelinedata.map((data) => (
                            <li className="mb-10 ml-3">
                                <div className="absolute w-3 h-3 bg-black rounded-full mt-0.5 -left-[0.45rem] border border-white"></div>
                                <div className="mb-1 text-sm font-semibold text-gray-400">{data.date}</div>
                                <p className="mb-2 font-normal">{data.message}</p>
                                <a className="text-blue-700 hover:underline" href={data.link}>{data.link}</a>
                            </li>
                        ))
                    }
                </ol>
                :
                <div className="">No timedata</div>
            }
        </div>
    )
}
