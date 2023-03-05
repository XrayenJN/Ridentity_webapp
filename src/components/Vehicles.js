import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Vehicles({ vehicle, toggleComplete, handleDelete, handleEdit,}) {
  const [newTitle, setNewTitle] = React.useState(vehicle.title);

  const handleChange = (e) => {
    e.preventDefault();
    if (vehicle.complete === true) {
      setNewTitle(vehicle.title);
    } else {
      vehicle.title = "";
      setNewTitle(e.target.value);
    }
  };
  return (
    <div className="todo">
      <input
        style={{ textDecoration: vehicle.completed && "line-through" }}
        type="text"
        value={vehicle.title === "" ? newTitle : vehicle.title}
        className="list"
        onChange={handleChange}
      />
      <div>
        <button
          className="button-complete"
          onClick={() => toggleComplete(vehicle)}
        >
          <CheckCircleIcon id="i" />
        </button>
        <button
          className="button-edit"
          onClick={() => handleEdit(vehicle, newTitle)}
        >
          <EditIcon id="i" />
        </button>
        <button className="button-delete" onClick={() => handleDelete(vehicle.id)}>
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
}