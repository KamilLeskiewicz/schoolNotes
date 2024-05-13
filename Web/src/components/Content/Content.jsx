import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../scss/Content.scss";

const Content = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/data");
        if (response.data && typeof response.data === "object") {
          setNotes([response.data]);
        } else if (response.data && Array.isArray(response.data)) {
          setNotes(response.data);
        } else {
          console.error(
            "Otrzymano nieprawidłowy format danych:",
            response.data
          );
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="content-container">
      {" "}
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Content;
