import { useRef, useState } from 'react';

const NotesAIAudio = ({ note }) => {
  const modalRef = useRef();
  const resultsRef = useRef();

  const handleAIAudio = async () => {
      const response1 = await fetch('https://gen-ai-wbs-consumer-api.onrender.com/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "d0lqyh9yiy8mgqdgm8nqxc",
          "provider":"open-ai",
          "mode":"development",
        },
        body: JSON.stringify({
          "model": "gpt-4o",
          "stream": false,
          "messages": [
            {
              "role": "user",
              "content": `Summarize the following text:\n\n${note.content}`
            }
          ]
        })
      });

      if (!response1.ok) {
        throw new Error('Network response was not ok');
      }
          const data = await response1.json();
          const summary = data.message.content.trim();
    try {
      const response = await fetch('https://gen-ai-wbs-consumer-api.onrender.com/api/v1/audio/speech', {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
          'Authorization': "d0lqyh9yiy8mgqdgm8nqxc",
          "provider":"open-ai",
          "mode":"development",
        },
        body: JSON.stringify({
          "model": "tts-1",
          "voice": "alloy",
          "input": summary
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      resultsRef.current.innerHTML = `<audio controls src="${audioUrl}">`;
    } catch (error) {
      console.error('Error fetching Summary Audio:', error);
      resultsRef.current.innerText = 'Error fetching Summary Audio';
    }
  };

  return (
    <>
      <div className='flex justify-center mb-2'>
        <button
          onClick={() => modalRef.current.showModal()}
          className='bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-full shadow-lg w-15 h-10'
        >
          🎶✨
        </button>
      </div>
      <dialog id='modal-note' className='modal' ref={modalRef}>
        <div className='modal-box h-[600px] py-0'>
          <div className='modal-action items-center justify-between mb-2'>
            <h1 className='text-2xl text-center'>Get AI Gen Audio</h1>
            <form method='dialog'>
              <button className='btn'>&times;</button>
            </form>
          </div>
          <div className='flex flex-col items-center gap-3'>
            <div
              className='textarea textarea-success w-full h-[400px] overflow-y-scroll'
              ref={resultsRef}
            >
              AI Audio GOES HERE
            </div>
            <button
              className='mt-5 btn bg-purple-500 hover:bg-purple-400 text-white'
              onClick={handleAIAudio}
            >
              Gen AI Summary Audio 🎶✨
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NotesAIAudio;
