import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# LOAD DATASET
data = pd.read_csv("dataset.csv")

# INPUT
X = data["description"]

# OUTPUT
y = data["severity"]

# CONVERT TEXT INTO NUMBERS
vectorizer = TfidfVectorizer()

X_vectorized = vectorizer.fit_transform(X)

# TRAIN MODEL
model = LogisticRegression()

model.fit(X_vectorized, y)

# TEST
sample = ["Huge water pipeline burst near road"]

sample_vector = vectorizer.transform(sample)

prediction = model.predict(sample_vector)

print("Predicted Severity:", prediction[0])