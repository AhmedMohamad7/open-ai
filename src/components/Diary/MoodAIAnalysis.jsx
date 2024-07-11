import { useRef } from 'react';
import { Charts } from '@/components/Diary';
import { useState } from 'react';
const MoodAIAnalysis = ({ entry }) => {
  const modalRef = useRef();
  const [aiSummary, setAISummary] = useState('');
  const[happiness,setHappiness] = useState(0);
  const[sadness,setSadness] = useState(0);
  const[satisfaction,setSatisfaction] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const handleAISummary = async () => {
    
    try {
      const response = await fetch('https://gen-ai-wbs-consumer-api.onrender.com/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
          'Authorization': "d0lqyh9yiy8mgqdgm8nqxc",
          "provider":"open-ai",
          "mode":"production",
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
    try{
      const response1 = await fetch('https://gen-ai-wbs-consumer-api.onrender.com/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
          'Authorization': "d0lqyh9yiy8mgqdgm8nqxc",
          "provider":"open-ai",
          "mode":"production",
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo-0125",
          "response_format": { "type": "json_object"},
          "messages": [
            {
              "role": "system",
              "content": "please return a answer in Json."
            },
            {
              "role": "user",
              "content": `i want a percentage of 3 impressions (happiness, sadness,satisfaction) of the following text:\n\n${entry.content}the first one is the percentage of happiness, the second one is the percentage of sadness and the third one is the percentage of satisfaction . use the following structure example: {happiness: 30, sadness: 60, satisfaction: 10}`
            }
          ]
        })
      });
      if (!response1.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response1.json();
      console.log(data);
      let content = data.message.content;
      content = content.replace(/\n/g, '').replace(/\s{2,}/g, '').replace(/\"/g, '').replace(/happiness/g, '').replace(/sadness/g, '').replace(/satisfaction/g, '').replace(/:/g, '').replace(/{/g, '').replace(/}/g, '').replace( / /g, '');
      content = content.split(',');
      content = content.map((item) => parseInt(item));
      setHappiness(content[0]);
      setSadness(content[1]);
      setSatisfaction(content[2]);
      setShowChart(true);

    }catch (error) {
      console.error('Error fetching summary:', error);
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
              {showChart ?
              <Charts happiness={happiness} sadness={sadness} satisfaction={satisfaction}/> :"No Chart yet"}
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
