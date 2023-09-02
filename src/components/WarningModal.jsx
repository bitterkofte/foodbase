const WarningModal = ({setWModal, wMTitle, wMDesc}) => {
  return (
    <div className="z-[99] fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div
        className="fixed w-full h-full z-[100] top-0 left-0 bg-modalColor"
        onClick={() => setWModal(false)}
      ></div>
      <div className="relative w-2/6 flex flex-col gap-y-2 p-8 z-[101] bg-slate-200 rounded-md">
        <h1>{wMTitle}</h1>
        <p>{wMDesc}</p>
      </div>
    </div>
  );
};

export default WarningModal;
