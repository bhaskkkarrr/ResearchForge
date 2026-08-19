from fastapi import FastAPI, APIRouter
from pipeline import research_report
from model import ResearchRequest
router = APIRouter()
app = FastAPI()
@app.post('/research/report')
async def build_research_report(topic:ResearchRequest):
  print('request reached')
  report = research_report(topic.topic)
  return report

@app.get('/')
async def root():
    return {"message": "Hello World"}