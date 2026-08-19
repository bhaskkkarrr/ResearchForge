from langchain_core.prompts import ChatPromptTemplate
from langchain_mistralai import ChatMistralAI
from langchain.agents import create_agent
from dotenv import load_dotenv
from tools import search_web, scrap_url
from model import Report, Critic

load_dotenv()

llm = ChatMistralAI(
  model = 'mistral-small-2603',
)

llm_report = llm.with_structured_output(Report)

llm_critic = llm.with_structured_output(Critic)


def build_search_agent():
  return create_agent(model = llm, tools=[search_web])

def build_read_agent():
  return create_agent(model = llm, tools= [scrap_url])

writer_prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an expert research writer. Write clear, structured and insightful reports.
      IMPORTANT FORMATTING RULES:

      1. All string values must contain plain text only.
      2. Never use Markdown.
      3. Never use **bold** or *italic* formatting.
      4. Never use bullet points or numbered lists inside string fields.
      5. Never use Markdown headings.
      6. Never use Markdown links.
      7. Never use backticks.
      8. Never use asterisks for formatting.
      9. Write normal paragraphs using complete sentences.
      10. Do not include formatting instructions or commentary in your output.

      The output must conform exactly to the provided structured schema.
    """),
    ("human", """Write a detailed research report on the topic below.

Topic: {topic}

Research Gathered:
{research}

Structure the report as:
- Introduction
- Key Findings (minimum 3 well-explained points)
- Conclusion
- Sources (list all URLs found in the research)

Be detailed, factual and professional."""),
])

writer_chain = writer_prompt | llm_report

critic_prompt = ChatPromptTemplate.from_messages([

  ("system", """You are a sharp and constructive research critic. Be honest and specific.
      IMPORTANT FORMATTING RULES:

      1. All string values must contain plain text only.
      2. Never use Markdown.
      3. Never use **bold** or *italic* formatting.
      4. Never use bullet points or numbered lists inside string fields.
      5. Never use Markdown headings.
      6. Never use Markdown links.
      7. Never use backticks.
      8. Never use asterisks for formatting.
      9. Write normal paragraphs using complete sentences.
      10. Do not include formatting instructions or commentary in your output.

      The output must conform exactly to the provided structured schema.
  """),
    ("human", """Review the research report below and evaluate it strictly.

Report:
{report}

Respond in this exact format:

Score: X/10

Strengths:
- ...
- ...

Areas to Improve:
- ...
- ...

One line verdict:
..."""),
])

critic_chain = critic_prompt | llm_critic






