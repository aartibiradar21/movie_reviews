import React, { useState } from 'react';

const AddMovieForm = ({ onMovieAdd ,onHideForm }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [Description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {

      title,
      year,
      Description,
    };
    onMovieAdd(newMovie);
    setTitle('');
    setYear('');
    setDescription('');
   
  };

    return (
    <div className="footer-con">
      <h2 className="white">Fill this form to add Movie</h2>
      <form onSubmit={handleSubmit}>
        <label className="s" htmlFor="title">
          Title:
        </label>
        <br/>
        <input
          className="c"
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <br /> {/* Add a line break after the title input */}

        <label className="s" htmlFor="year">
          Year:
        </label>
        <br/>
        <input
          className="c"
          type="text"
          id="year"
          value={year}
          onChange={handleYearChange}
          required
        />
        <br />        
        <label className="s" htmlFor="Description">Description:</label><br />
        <textarea className="t-area"
          id="Description"
          value={Description}
          onChange={handleDescriptionChange}
          required
        ></textarea>
        <br />
        <br />

        <button className="Add" type="submit">Add Movie</button>
        <button className="Hide" type="button" onClick={onHideForm}>
          Hide Form
        </button>
      </form>
    </div>
  );
};


export default AddMovieForm;