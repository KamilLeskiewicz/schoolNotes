import React, { useState, useEffect } from "react";
import axios from "axios";

const Content = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("dupa");
        const response = await axios.get("/api/data");
        console.log("dupa");
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
      <ul>
        {notes.map((note) => {
          console.log("Note:", note);
          return (
            <li key={note._id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Content;
