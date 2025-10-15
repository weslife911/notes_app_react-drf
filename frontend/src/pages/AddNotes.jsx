import "./AddNotes.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UseCreateNoteMutation } from "../services/mutations"
import { UseGetCategoriesQuery } from "../services/queries";

function AddNotes() {
  const navigate = useNavigate();

  const createNoteMutation = UseCreateNoteMutation();
  const getCategoriesQuery = UseGetCategoriesQuery();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values) => {
      try {
        await createNoteMutation.mutate(values, {
          onSuccess: () => {
            navigate("/");
          }
        });
      } catch (error) {
        console.error("Failed to add note:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h5>Add New Note</h5>

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
        value="Add Note"
        disabled={createNoteMutation.isPending}
      />
    </form>
  );
}

export default AddNotes;