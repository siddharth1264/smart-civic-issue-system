import { useEffect, useState } from "react";
import axios from "axios";

function UserPage() {

  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    location: "",
  });

  const [message, setMessage] = useState("");

  const [complaints, setComplaints] = useState([]);

  // FETCH COMPLAINTS
  const fetchComplaints = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/complaints"
      );

      setComplaints(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchComplaints();

  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/complaints/add",
        formData
      );

      setMessage(response.data.message);

      setFormData({
        issueType: "",
        description: "",
        location: "",
      });

      fetchComplaints();

    } catch (error) {

      console.log(error);

      setMessage("Error submitting complaint");

    }

  };

  return (

    <div style={styles.container}>

      <h1>User Complaint Portal</h1>

      <form onSubmit={handleSubmit} style={styles.form}>

        <input
          type="text"
          name="issueType"
          placeholder="Issue Type"
          value={formData.issueType}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Submit Complaint
        </button>

      </form>

      <p>{message}</p>

      <hr />

      <h2>Complaints</h2>

      {complaints.map((item) => (

        <div key={item._id} style={styles.card}>

          <h3>{item.issueType}</h3>

          <p>{item.description}</p>

          <p>
            <strong>Location:</strong> {item.location}
          </p>

          <p>
            <strong>Status:</strong> {item.status}
          </p>

        </div>

      ))}

    </div>

  );

}

const styles = {

  container: {
    width: "700px",
    margin: "30px auto",
    fontFamily: "Arial",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    fontSize: "16px",
  },

  textarea: {
    padding: "12px",
    height: "100px",
    fontSize: "16px",
  },

  button: {
    padding: "12px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  card: {
    border: "1px solid lightgray",
    padding: "15px",
    marginTop: "15px",
    borderRadius: "10px",
  },

};

export default UserPage;