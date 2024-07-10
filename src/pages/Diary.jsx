import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreateEntry, EntriesList } from '@/components/Diary';
import { toast } from 'react-toastify';

const Diary = () => {
  const [entries, seEntries] = useState([]);
  const [aiImageChanged, setAiImageChanged ] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_NOTES_API}/entries`);
        seEntries(data);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [aiImageChanged]);

  return (
    <>
      <EntriesList entries={entries} aiImageChanged={aiImageChanged} setAiImageChanged={setAiImageChanged}/>
      <CreateEntry setEntries={seEntries} />
    </>
  );
};

export default Diary;
