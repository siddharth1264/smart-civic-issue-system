import { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {

  const [complaints, setComplaints] = useState([]);

  // FETCH COMPLAINTS
  const fetchComplaints = async () => {

    try {

      const response = await axios.get(
        "https://smart-civic-backend-0wn9.onrender.com/api/complaints"
      );

      setComplaints(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchComplaints();

  }, []);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `https://smart-civic-backend-0wn9.onrender.com/api/complaints${id}`,
        { status }
      );

      fetchComplaints();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={styles.container}>

      <h1>Admin Dashboard</h1>

      {complaints.map((item) => (

        <div key={item._id} style={styles.card}>

          <h2>{item.issueType}</h2>

          <p>{item.description}</p>

          <p>
            <strong>Location:</strong> {item.location}
          </p>

          <p>
            <strong>Severity:</strong> {item.severity}
          </p>

          <p>
            <strong>Priority:</strong> {item.priority}
          </p>

          <p>
            <strong>Status:</strong> {item.status}
          </p>

          <div style={styles.buttonGroup}>

            <button
              style={styles.button}
              onClick={() =>
                updateStatus(item._id, "In Progress")
              }
            >
              In Progress
            </button>

            <button
              style={styles.button}
              onClick={() =>
                updateStatus(item._id, "Resolved")
              }
            >
              Resolved
            </button>

          </div>

        </div>

      ))}

    </div>

  );

}

const styles = {

  container: {
    width: "800px",
    margin: "30px auto",
    fontFamily: "Arial",
  },

  card: {
    border: "1px solid lightgray",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "10px",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  button: {
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },

};

export default AdminPage;
