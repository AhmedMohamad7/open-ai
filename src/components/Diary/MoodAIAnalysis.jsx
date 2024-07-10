import { useRef } from 'react';
import { Charts } from '@/components/Diary';
import { useState } from 'react';
const MoodAIAnalysis = ({ entry }) => {
  const modalRef = useRef();
  const [aiSummary, setAISummary] = useState('');
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
          "messages": [
            {
              "role": "user",
              "content": `tell me the mood or the impretion of  the following text and what is the best thing to do to make it better:\n\n${entry.content}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const summary = data.message.content.trim();
      setAISummary(summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      resultsRef.current.innerText = 'Error fetching summary';
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => modalRef.current.showModal()}
          className='bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded-full shadow-lg w-15 h-10'
        >
          ✨
        </button>
      </div>
      <dialog id='modal-note' className='modal' ref={modalRef}>
        <div className='modal-box h-[600px] py-0 w-11/12 max-w-5xl'>
          <div className='modal-action items-center justify-between mb-2'>
            <h1 className='text-2xl text-center'>Get your AI Gen Mood Analysis</h1>
            <form method='dialog'>
              <button className='btn'>&times;</button>
            </form>
          </div>
          <div className='flex items-center gap-3'>
            <div className='textarea textarea-success w-1/2 h-[400px] overflow-y-scroll'>
              {aiSummary ||"AI SUMMARY GOES HERE..."}
            </div>
            <div className='textarea textarea-success w-1/2 h-[400px] overflow-y-scroll'>
              <Charts aiSummary={aiSummary} />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              className='mt-5 btn bg-purple-500 hover:bg-purple-400 text-white'
              onClick={handleAISummary}
            >
              Gen AI mood analysis ✨
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default MoodAIAnalysis;
