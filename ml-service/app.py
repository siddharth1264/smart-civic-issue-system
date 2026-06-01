from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# CREATE APP
app = FastAPI()

# LOAD SAVED MODEL
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# REQUEST FORMAT
class Complaint(BaseModel):
    description: str

# PREDICTION API
@app.post("/predict")
def predict_severity(complaint: Complaint):

    text = [complaint.description]

    vectorized_text = vectorizer.transform(text)

    prediction = model.predict(vectorized_text)

    return {
        "severity": prediction[0]
    }

# ROOT ROUTE
@app.get("/")
def home():
    return {
        "message": "ML Service Running"
    }