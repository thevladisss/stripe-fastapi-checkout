from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Mount the ui directory to serve static files
app.mount("/", StaticFiles(directory="dist", html=True), name="ui")
