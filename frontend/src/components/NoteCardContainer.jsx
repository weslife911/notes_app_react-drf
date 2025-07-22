import { useEffect, useState } from "react";
import { useNoteStore } from "../store/useNoteStore";
import NoteCard from "./NoteCard";

function NoteCardContainer() {
  const { getNotes, notes } = useNoteStore();
  const [color, setColor] = useState("green");

  useEffect(() => {
    getNotes();
  }, []);

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
        {notes.map((note) => (
          <NoteCard key={note.id} color={color} note={note} />
        ))}
      </div>
    </div>
  );
}

export default NoteCardContainer;