import React, { useState, useEffect } from "react";
import axios from "axios";

const Content = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/data");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      {Array.isArray(notes) && notes.map((note) => {
          return (
            <li key={note._id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </li>
          );
        })}
    </div>
  );
};

export default Content;
