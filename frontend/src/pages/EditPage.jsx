import "./AddNotes.css";
import { useNoteStore } from "../store/useNoteStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { UseGetCategoriesQuery, UseGetNoteQuery } from "../services/queries";
import Loader from "../components/Loader";

function EditPage() {
  const { editNote } = useNoteStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const getNoteQuery = UseGetNoteQuery(id);
  const getCategoriesQuery = UseGetCategoriesQuery();

  const formik = useFormik({
    initialValues: {
      title: getNoteQuery?.data ? getNoteQuery?.data.title : "",
      content: getNoteQuery?.data ? getNoteQuery?.data.content : "",
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values) => {
      try {
        editNote(id, {
          title: values.title,
          content: values.category,
          category: values.category,
          category_id: getNoteQuery?.data.category
        });
        navigate(`/note/${id}`);
      } catch (error) {
        console.error("Failed to edit note:", error);
      }
    },
  });

  if(getNoteQuery.isPending) return (
    <Loader/>
  )

  return (
    <form onSubmit={formik.handleSubmit}>
      <h5>Edit Note</h5>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter note's title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {formik.errors.title && (
          <p style={{ color: "red" }}>{formik.errors.title}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="content"
          rows={4}
          placeholder="Enter note's content"
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
        />
        {formik.errors.content && (
          <p style={{ color: "red" }}>{formik.errors.content}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Note's category
        </label>
        <input
          className="form-control"
          id="category"
          name="category"
          type="text"
          list="categories"
          value={formik.values.category}
          onChange={formik.handleChange}
        />
        <datalist id="categories">
          {getCategoriesQuery?.data.map((category) => (
            <option key={category.id} value={category.category} />
          ))}
        </datalist>
        {formik.errors.category && (
          <p style={{ color: "red" }}>{formik.errors.category}</p>
        )}
      </div>

      <input
        type="submit"
        className="btn btn-primary d-flex justify-content-center"
        style={{ width: "100%" }}
        value="Edit Note"
      />
    </form>
  );
}

export default EditPage;