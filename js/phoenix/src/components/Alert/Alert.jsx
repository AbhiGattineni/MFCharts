export const Alert = ({visible,main,onClose,children,confirmMsg}) => {
    if(!visible) return null;
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-base font-semibold px-3 pt-1">{main}</h3>
                            <button className="text-xl px-3 rounded font-semibold hover:bg-red-500 hover:text-white" onClick={onClose}>X</button>
                        </div>
                        <div className="relative p-6 flex-auto">{children}</div>
                        <div className="grid grid-cols-2 justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase pr-10 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={confirmMsg}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}