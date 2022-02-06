import React from "react";

const ReadOnlyRow = ({ record, handleEditClick, handleDeleteClick }) => {

    let minTemp = parseInt(record.minTemp);
    let maxTemp = parseInt(record.maxTemp);

    return (
        <tr>
            <td>{record.date}</td>

            <td style={minTemp <= 3 ? {color: 'blue'} : minTemp >= 30 ? {color: 'red'} : {color: 'black'}}>{minTemp}°</td>

            <td style={maxTemp <= 3 ? {color: 'blue'} : maxTemp >= 30 ? {color: 'red'} : {color: 'black'}}>{maxTemp}°</td>

            <td>{(minTemp+ maxTemp)/2}°</td>

            {/*  Buttons*/}
            <td>
                <button
                    type="button"
                    onClick={(event) => handleEditClick(event, record)}>
                    🖊️
                </button>
                <button
                    type="button"
                    onClick={() => handleDeleteClick(record.id)}>
                    🗑️
                </button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow;
