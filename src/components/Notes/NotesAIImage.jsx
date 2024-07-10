import { useRef } from 'react';
import { useState } from 'react';
const NotesAIImage = ({ note,aiImageChanged,setAiImageChanged}) => {
  const modalRef = useRef();
  const resultsRef = useRef();
  const [aiImage, setAiImage] = useState("");
  const handleAIImage = async () => {
    try {
      resultsRef.current.innerHTML = ' Image Loading...';
      const response = await fetch('https://gen-ai-wbs-consumer-api.onrender.com/api/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "d0lqyh9yiy8mgqdgm8nqxc",
          "provider": "open-ai",
          "mode": "development",
        },
        body: JSON.stringify({
          "model": "dall-e-3",
          "prompt": `Generate an image of a ${note.title}`,
          "n": 1,
          "size": "1024x1024"
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      const imageUrl = data[0].url;
      setAiImage(imageUrl);
      resultsRef.current.innerHTML = `<img src="${imageUrl}" class="w-full h-full" alt="AI Image" />`;
    } catch (error) {
      console.error('Error fetching Image:', error);
      resultsRef.current.innerText = 'Error fetching Image';
    }
  };

  const handleNoteImage = async () => {
    try {
      const response1 = await fetch("http://localhost:8080/notes/" + note._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "image": aiImage
        })
      });

      const data = await response1.json();
      console.log(data);
      setAiImageChanged(!aiImageChanged);
    } catch (error) {
      console.error('Error setting Note Image:', error);
    }
  };

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
              Gen AI Image 📸✨
            </button>
            <button
              className='mt-5 btn bg-purple-500 hover:bg-purple-400 text-white'
              onClick={handleNoteImage} onClickCapture={() => modalRef.current.close()}
            >
              Set as Note Image
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NotesAIImage;
