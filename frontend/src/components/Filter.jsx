import React, { useEffect } from 'react'
import { useNoteStore } from '../store/useNoteStore'
import { Link } from "react-router-dom"

function Filter() {

  const { getCategories, categories } = useNoteStore();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container" style={{width: "500px", margin: "20px auto"}}>
      <select className="form-select" aria-label="Default select example" style={{height: "50px"}}>
        <option value="" >Filter Notes</option>
        {categories.map((category) => (
            <option key={category.id} value={category.id} >
              {category.category}
            </option>
        ))}
      </select>
    </div>
  )
}

export default Filter