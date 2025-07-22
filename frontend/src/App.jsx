import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import HomePage from "./pages/HomePage"
import AddNotes from "./pages/AddNotes"
import NotePage from "./pages/NotePage"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
    	<Routes>
        <Route element={<HomePage/>} path="/" />
        <Route element={<AddNotes/>} path="/add-notes" />
        <Route element={<NotePage/>} path="/note/:id" />
      </Routes>
    </>
  )
}

export default App
