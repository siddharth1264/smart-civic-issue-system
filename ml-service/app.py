from fastapi import FastAPI
from pydantic import BaseModel

import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# CREATE FASTAPI APP
app = FastAPI()

# LOAD DATASET
data = pd.read_csv("dataset.csv")

# INPUT
X = data["description"]

# OUTPUT
y = data["severity"]

# TEXT TO NUMBERS
vectorizer = TfidfVectorizer()

X_vectorized = vectorizer.fit_transform(X)

# TRAIN MODEL
model = LogisticRegression()

model.fit(X_vectorized, y)

# REQUEST FORMAT
class Complaint(BaseModel):
    description: str

# API ROUTE
@app.post("/predict")
def predict_severity(complaint: Complaint):

    text = [complaint.description]

    vectorized_text = vectorizer.transform(text)

    prediction = model.predict(vectorized_text)

    return {
        "severity": prediction[0]
    }