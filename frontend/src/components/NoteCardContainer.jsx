import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { UseGetNotesQuery } from "../services/queries";

function NoteCardContainer() {
  const [color, setColor] = useState("green");

  const getNotesQuery = UseGetNotesQuery();

  useEffect(() => {
    const colors = ["green", "purple", "blue", "orange"];
    
    const changeColor = () => {
      setColor(colors[Math.floor(Math.random() * colors.length)]);
    };

    const intervalId = setInterval(changeColor, 5000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="container">
      <div className="note-has-grid row">
        {getNotesQuery.data.map((note) => (
          <NoteCard key={note.id} color={color} note={note} />
        ))}
      </div>
    </div>
  );
}

export default NoteCardContainer;