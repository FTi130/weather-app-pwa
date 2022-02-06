import React, { useState, Fragment } from "react";
import "./App.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

import upload from './upload.png';
import download from './download.png';


const dataInit = [

  ]

const App = () => {

  let fileName = React.createRef();
  let fileContent = React.createRef();
  const [name, setName] = useState();

  const [content, setContent] = useState();

  // file upload related
  const [uploadFile, setUploadFile] = React.useState();

  const [records, setRecords] = useState(dataInit);

  const [addFormData, setAddFormData] = useState({
    date: "",
    minTemp: "",
    maxTemp: "",
  });

  const [editFormData, setEditFormData] = useState({
    date: "",
    minTemp: "",
    maxTemp: "",
  });


  function getAvg(records) {
    let len = records.length;
    let counter = 0;
    records.forEach(function(el) {
      let min = el.minTemp;
      let max = el.maxTemp;
      let avg = (parseInt(min)+parseInt(max))/2;
      counter = counter +avg;
    });
    return (counter/len).toFixed(1);
  }


  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: records.length+1,
      date: addFormData.date,
      minTemp: addFormData.minTemp,
      maxTemp: addFormData.maxTemp,
    };

    const newRecords = [...records, newContact];
    setRecords(newRecords);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      date: editFormData.date,
      minTemp: editFormData.minTemp,
      maxTemp: editFormData.maxTemp,
    };

    const newRecords = [...records];

    const index = records.findIndex((record) => record.id === editContactId);

    newRecords[index] = editedContact;

    setRecords(newRecords);
    setEditContactId(null);
  };

  const handleEditClick = (event, record) => {
    event.preventDefault();
    setEditContactId(record.id);

    const formValues = {
      date: record.date,
      minTemp: record.minTemp,
      maxTemp: record.maxTemp,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newRecords = [...records];
    const index = records.findIndex((record) => record.id === contactId);
    newRecords.splice(index, 1);
    setRecords(newRecords);
  };

  const handleFileChange = e => {

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
     reader.onload = () => {
      const fileName = file.name;
      const fileContent = reader.result;

    }

  };

  const convertToFrh = () => {


  };


  const downloadFile = () => {
    const element = document.createElement("a");

    // const fileName = name[0].toString();  // but what if the user saves the blank project?
    const fileData = JSON.stringify(records);
    const file = new Blob([fileData], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);

    if (name===undefined) {
      let nameProject;
      nameProject = document.getElementById('nameProject').value;

      element.download = `${nameProject.toString()}.json`;
    }
    else {
      const fileName = name[0].toString();  // but what if the user saves the blank project?
      element.download = `${fileName}.json`;
    }
    // element.download = `${fileName}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }





  return (
      <>
        <header className="App-header">
          <h1 className="App-title">Weather App</h1>
        </header>


        <div className="app-container">

          <h2>{name}</h2>
          {/*file upload*/}

          <div>
            <input
                type="file"
                accept=".json"
                id="inputFile"
                ref={fileName}
                placeholder="Upload your file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.readAsText(file);
                  reader.onload = () => {
                    setName(file.name.toString().split(".json"));
                    setContent(JSON.parse(reader.result)); // separate hook for the content
                    setRecords(JSON.parse(reader.result));
                    document.getElementById("nameProject").style.display = 'none';
                  }
                }}
            />

            <label for="inputFile" id="labelFile">
              <img src={upload} alt="upload project" style={{width: '40px', height: 'auto'}}/>
            </label>
          </div>



          <div>
            <h3>Average Temperature:</h3>
            <p>{getAvg(records)}°</p>
          </div>
          {/*<p>Content is {typeof content}</p>*/}
          {/*  <p>records is {typeof records}</p>*/}
          {/*<FileInput />*/}






          <h2>Add Record</h2>
          <form onSubmit={handleAddFormSubmit}>
            <input
                type="date" // ???
                name="date"
                required="required"
                placeholder="Enter Date..."
                onChange={handleAddFormChange}
            />
            <input
                type="number"
                name="minTemp"
                required="required"
                placeholder="Enter MinTemp..."
                onChange={handleAddFormChange}
            />
            <input
                type="number"
                name="maxTemp"
                required="required"
                placeholder="Enter MaxTemp..."
                onChange={handleAddFormChange}
            />
            <button type="submit">➕</button>
          </form>

          <div style={{margin: '2vh auto'}}>
          </div>

          <form onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
              <tr>
                <th>Date</th>
                <th>Min Temp</th>
                <th>Max Temp</th>
                <th>Average</th>
                <th>🖊️🗑️</th>
              </tr>
              </thead>
              <tbody>
              {/*content if exists*/}
              {records.map((record) => (
                  <Fragment>
                    {editContactId === record.id ? (
                        <EditableRow
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                        />
                    ) : (
                        <ReadOnlyRow
                            record={record}
                            handleEditClick={handleEditClick}
                            handleDeleteClick={handleDeleteClick}
                        />
                    )}
                  </Fragment>
              ))}
              </tbody>
            </table>
          </form>

        </div>

        <div style={{margin: '7px auto', textAlign: 'center'}}>

          <input type="text"
                 name="enter"
                 id="nameProject"
                 maxLength="100"
                 placeholder="Project Name..."
          />

          <button style={{background: 'transparent', border: 0}}>
            <img src={download} alt="download project" onClick={downloadFile} style={{width: '60px', height: 'auto',
              cursor: 'pointer'}}/>
          </button>
        </div>
      </>
  );
};

export default App;
