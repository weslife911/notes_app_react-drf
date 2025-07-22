import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import HomePage from "./pages/HomePage"
import AddNotes from "./pages/AddNotes"
import NotePage from "./pages/NotePage"
import EditPage from "./pages/EditPage"
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import { Toaster } from "react-hot-toast"

function App() {

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
