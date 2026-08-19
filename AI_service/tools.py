from langchain.tools import tool
import requests
from bs4 import BeautifulSoup
from tavily import TavilyClient
import os
from dotenv import load_dotenv
load_dotenv()

tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
@tool
def search_web(query : str) -> str:
  """Search the web and get the real time data of title and URLs on some topic"""
  pages = []
  results = tavily.search(query, max_results=5)

  for r in results['results']:
    pages.append(
      f"URL : {r['url']}\nTitle : {r['title']}\n"
    )

  return "\n---\n".join(pages)

@tool
def scrap_url(url : str) -> str:
  """Scraps the data from the website whose url is provided"""
  try:
    resp = requests.get(url=url, timeout=8, headers={'User-Agent':'Mozilla/5.0'})
    soup = BeautifulSoup(resp.text, 'html.parser')
    for tag in soup(['script', 'nav', 'style', 'head', 'footer']):
      tag.decompose()

    return soup.get_text(separator= " ", strip=True)[:3000]  
  except Exception as e:
    return(f"Could not scrap the data\n {e}")  

