import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import HomePage from "./pages/HomePage"
import AddNotes from "./pages/AddNotes"
import NotePage from "./pages/NotePage"
import EditPage from "./pages/EditPage"
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import { Toaster } from "react-hot-toast"
import { UseCreateNoteMutation } from "./services/mutations"
import Loader from "./components/Loader"
import { UseGetCategoriesQuery, UseGetNotesQuery } from "./services/queries"

function App() {

  const createNoteMutation = UseCreateNoteMutation();
  const getCategoriesQuery = UseGetCategoriesQuery();
  const getNotesQuery = UseGetNotesQuery();

  if(createNoteMutation.isPending || getCategoriesQuery.isPending || getNotesQuery.isPending) return (
    <Loader/>
  )

  return (
    <>
    <NavBar/>
    	<Routes>
        <Route element={<HomePage/>} path="/" />
        <Route element={<AddNotes/>} path="/add-notes" />
        <Route element={<NotePage/>} path="/note/:id" />
        <Route element={<EditPage/>} path="/note/edit/:id" />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
