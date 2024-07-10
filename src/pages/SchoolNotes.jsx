import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreateNote,NotesList } from '@/components/Notes';
import { toast } from 'react-toastify';

const SchoolNotes = () => {
  const [notes, setNotes] = useState([]);
  const [aiImageChanged, setAiImageChanged ] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_NOTES_API}/notes`);
        setNotes(data);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [aiImageChanged]);

  return (
    <>
      <NotesList notes={notes} aiImageChanged={aiImageChanged} setAiImageChanged={setAiImageChanged}/>
      <CreateNote setNotes={setNotes} />
    </>
  );
};

export default SchoolNotes;
