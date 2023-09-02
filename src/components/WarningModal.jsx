import { MdClose } from "react-icons/md";

const WarningModal = ({color, setWModal, wMTitle, wMDesc}) => {
  return (
    <div className="z-[99] fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div
        className="fixed w-full h-full z-[100] top-0 left-0 bg-modalColor"
        onClick={() => setWModal(false)}
      ></div>
      {/* ANCHOR Modal Container */}
      {/* <div className={`relative w-2/6 flex flex-col gap-y-2 p-8 border-2 border-${color}-600 z-[101] bg-slate-200 rounded-md`}> */}
      <div className={`relative w-2/6 flex flex-col gap-y-2 p-8 border-[3.5px] border-${color}-500 z-[101] bg-slate-200 rounded-2xl select-none`}>
        <MdClose
          onClick={() => setWModal(false)}
          className="absolute top-3 right-3 bg-slate-500 hover:bg-red-500 text-slate-100 rounded-md transition-all cursor-pointer"
          size={20}
        />
        <h1 className={`text-${color}-500 text-xl font-bold`}>{wMTitle}</h1>
        <p className="italic">{wMDesc}</p>
      </div>
    </div>
  );
};

export default WarningModal;
