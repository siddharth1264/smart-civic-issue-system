import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div style={styles.container}>

      <h1>Smart Civic Issue Prioritization System</h1>

      <p>
        AI Powered Civic Complaint Management Platform
      </p>

      <div style={styles.buttonContainer}>

        <button
          style={styles.button}
          onClick={() => navigate("/user")}
        >
          Continue as User
        </button>

        <button
          style={styles.button}
          onClick={() => navigate("/admin")}
        >
          Continue as Admin
        </button>

      </div>

    </div>

  );

}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },

  buttonContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },

  button: {
    padding: "15px 30px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },

};

export default Home;