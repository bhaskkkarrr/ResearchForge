from fastapi import FastAPI, APIRouter, Response
from pipeline import research_report
from model import ResearchRequest

router = APIRouter()
app = FastAPI()

@app.get("/")
def health_check():
    return {
        "success": True,
        "message": "AI service is running"
    }

@app.head('/')
def service_wakeup():
   return Response(status_code=200)


@app.post('/research/report')
async def build_research_report(topic:ResearchRequest):
  print('request reached')
  report = research_report(topic.topic)
  return report

@app.get('/')
async def root():
    return {"message": "Hello World"}