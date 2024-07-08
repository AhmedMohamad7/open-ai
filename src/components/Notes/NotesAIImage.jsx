import { useRef, useState } from 'react';

const NotesAIImage = ({ notes }) => {
  const modalRef = useRef();
  const resultsRef = useRef();
  const [stream, setStream] = useState(false);

  const handleAIImage = async () => {};

  return (
    <>
      <div className='flex justify-center mb-2'>
        <button
          onClick={() => modalRef.current.showModal()}
          className='bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-2 rounded-full shadow-lg w-15 h-10'
        >
          📸✨
        </button>
      </div>
      <dialog id='modal-note' className='modal' ref={modalRef}>
        <div className='modal-box h-[600px] py-0'>
          <div className='modal-action items-center justify-between mb-2'>
            <h1 className='text-2xl text-center'>Get AI Gen Image</h1>
            <label htmlFor='Stream?' className='flex items-center gap-1'>
              Stream?
              <input
                id='Stream?'
                type='checkbox'
                className='toggle toggle-error'
                checked={stream}
                onChange={() => setStream(p => !p)}
              />
            </label>

            <form method='dialog'>
              <button className='btn'>&times;</button>
            </form>
          </div>
          <div className='flex flex-col items-center gap-3'>
            <div
              className='textarea textarea-success w-full h-[400px] overflow-y-scroll'
              ref={resultsRef}
            >
              AI Image GOES HERE
            </div>
            <button
              className='mt-5 btn bg-purple-500 hover:bg-purple-400 text-white'
              onClick={handleAIImage}
            >
              Gen AI Image  📸✨
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NotesAIImage;
