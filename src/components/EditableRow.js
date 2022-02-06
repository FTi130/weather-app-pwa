import React from "react";

const EditableRow = ({
                         editFormData,
                         handleEditFormChange,
                         handleCancelClick,
                     }) => {
    return (
        <tr>
            <td>
                <input
                    type="date"
                    required="required"
                    placeholder="Enter a name..."
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditFormChange}
                />
            </td>


            <td>
                <input
                    type="number"
                    required="required"
                    placeholder="Enter minTemp..."
                    name="minTemp"
                    value={editFormData.minTemp}
                    onChange={handleEditFormChange}
                />
            </td>


            <td>
                <input
                    type="number"
                    required="required"
                    placeholder="Enter MaxTemp..."
                    name="maxTemp"
                    value={editFormData.maxTemp}
                    onChange={handleEditFormChange}
                />
            </td>

            <td>

            </td>

            <td>
                <button type="submit">💾</button>
                <button type="button" onClick={handleCancelClick}>
                    ❌
                </button>
            </td>
        </tr>
    );
};

export default EditableRow;
