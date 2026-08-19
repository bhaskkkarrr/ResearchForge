from pydantic import BaseModel, Field

class Links(BaseModel):
  title: str = Field(description='The provider name of the source')
  url: str = Field(description='the actual url to the source website')

class key_finding(BaseModel):
  title: str = Field(description='give the key finding of the research')
  detailed_explanation: str = Field(description='give me well and detailed explanation of title')

class Report(BaseModel):
  introduction: str
  key_findings: list[key_finding]
  conclusion: str
  sources: list[Links]


class Critic(BaseModel):
  score: int = Field(description='give the score to the report out of 10')
  area_to_improve: list[str]
  strengths: list[str]
  verdict: str = Field(description='give a one line verdict for the report feedback')

class ResearchRequest(BaseModel):
    topic: str
