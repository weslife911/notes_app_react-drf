import "./NotePage.css"
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Modal from "../components/Modal";
import { useNoteStore } from "../store/useNoteStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { format, parseISO } from 'date-fns';

function NotePage() {

  const { getNote, note } = useNoteStore();

  const { id } = useParams();

  useEffect(() => {
    getNote(id);
  }, []);

  console.log(note);

  return (
    <>
    <div className="note-container">
    <h3 className="title">{note.title}</h3>
    <span className="d-flex justify-content-center">
    {/* <p className="note-date font-12 text-muted me-5"> created: {format(parseISO(note.created), 'dd MMMM yyyy')}</p> */}
    {/* <p className="note-date font-12 text-muted me-5">last updated: 11 March 2009</p> */}
    </span>
    <span className="button-group">
      <button className="btn btn-primary"><FiEdit /><span>Edit</span></button>
      <button className="btn btn-danger"><BiSolidTrashAlt /><span>Delete</span></button>
    </span>
    <p className="description">
      {note.content}
    </p>



    

  </div>
  <Modal />
  </>
  )
}

export default NotePage