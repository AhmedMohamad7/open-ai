import { useRef, useState } from 'react';

const NotesAISummary = ({ note }) => {
  const modalRef = useRef();
  const resultsRef = useRef();
  const [stream, setStream] = useState(false);

  const handleAISummary = async () => {
    try {
      const response = await fetch('https://gen-ai-wbs-consumer-api.onrender.com/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "d0lqyh9yiy8mgqdgm8nqxc",
          "provider":"open-ai",
          "mode":"development",
        },
        body: JSON.stringify({
          "model": "gpt-4o",
          "stream": stream,
          "messages": [
            {
              "role": "user",
              "content": `Summarize the following text:\n\n${note.content}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (stream) {
        resultsRef.current.innerText = '';
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let result = false;
        while (!(result = await reader.read()).done) {
          const chunk = decoder.decode(result.value, { stream: true });
          const lines = chunk.split('\\n');
          lines.forEach(line => {
            if (line.startsWith('data:')) {
              const jsonStr = line.replace('data:', '');
              const data = JSON.parse(jsonStr);
              const content = data.choices[0]?.delta?.content;
              if (content) {
                resultsRef.current.innerText += " "+content;
              }
            }
          });
        }
      } else {
        const data = await response.json();
        console.log(data);
          const summary = data.message.content.trim();
          resultsRef.current.innerText = summary;
       
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
      resultsRef.current.innerText = 'Error fetching summary';
    }
  };

  return (
    <>
      <div className='flex justify-center mb-2'>
        <button
          onClick={() => modalRef.current.showModal()}
          className='bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-full shadow-lg w-15 h-10'
        >
          ✨
        </button>
      </div>
      <dialog id='modal-note' className='modal' ref={modalRef}>
        <div className='modal-box h-[600px] py-0'>
          <div className='modal-action items-center justify-between mb-2'>
            <h1 className='text-2xl text-center'>Get AI Gen summary</h1>
            <form method='dialog'>
              <button className='btn'>&times;</button>
            </form>
          </div>
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

          <div className='flex flex-col items-center gap-3'>
            <div
              className='textarea textarea-success w-full h-[400px] overflow-y-scroll'
              ref={resultsRef}
            >
              AI SUMMARY GOES HERE
            </div>
            <button
              className='mt-5 btn bg-purple-500 hover:bg-purple-400 text-white'
              onClick={handleAISummary}
            >
              Gen AI summary ✨
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NotesAISummary;
