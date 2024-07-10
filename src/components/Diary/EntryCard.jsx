import  MoodAIAnalysis  from "./MoodAIAnalysis.jsx";
import MoodAIAnalysisAudio from "./MoodAIAnalysisAudio.jsx";
import MoodAIAnalysisImage from "./MoodAIAnalysisImage.jsx";
const EntryCard = ({ entry}) => {
  return (
    <div className='card bg-base-100 shadow-xl'>
      <figure className='bg-white h-48'>
        <img src={entry.image} alt={entry.title} className='object-cover h-full w-full' />
      </figure>
      <div className='card-body h-56'>
        <h2 className='card-title'>{entry.title}</h2>
        <h3 className='font-bold'>{new Date(entry.date).toDateString()}</h3>
        <p className='truncate text-wrap'>{entry.content}</p>
      </div>
      <div className="flex flex-row mb-2 card-actions justify-center">
      <MoodAIAnalysis entry={entry} />
      <MoodAIAnalysisAudio entry={entry} />
      <MoodAIAnalysisImage entry={entry} />
      </div>
    </div>
  );
};

export default EntryCard;
