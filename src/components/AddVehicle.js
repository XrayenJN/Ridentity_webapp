import React from "react";

import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc
} from "firebase/firestore";
import { db } from "../firebase";
import Vehicles from "./Vehicles";

export default function AddVehicle() {
  // VEHICLES PART
  const [vehicles, setVehicles] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "vehicles"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let vehiclesArray = [];
      querySnapshot.forEach((doc) => {
        vehiclesArray.push({ ...doc.data(), id: doc.id });
      });
      setVehicles(vehiclesArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (vehicle, title) => {
    await updateDoc(doc(db, "vehicles", vehicle.id), { title: title });
  };
  const toggleComplete = async (vehicle) => {
    await updateDoc(doc(db, "vehicles", vehicle.id), { completed: !vehicle.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "vehicles", id));
  };

  const [title, setTitle] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      await addDoc(collection(db, "vehicles"), {
        title,
        completed: false,
      });
      setTitle("");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input_container">
          <input
            type="text"
            placeholder="Enter vehicle ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="btn_container">
          <button>Add</button>
        </div>
      </form>
      <div className="App">
        <div className="todo_container">
          {vehicles.map((vehicle) => (
            <Vehicles
              key={vehicle.id}
              vehicle={vehicle}
              toggleComplete={toggleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}