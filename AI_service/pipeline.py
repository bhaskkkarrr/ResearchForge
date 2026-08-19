from agents import writer_chain, critic_chain, build_read_agent, build_search_agent

def research_report(topic : str) -> dict:
  state = {}

  print("\nSearch Agent Working...")

  search_agent = build_search_agent()
  search_result = search_agent.invoke({
    "messages" : [("user", f"Find recent realiable information about {topic}")]
  })
  state['search_results'] = search_result['messages'][-1].content

  print("\nRead Agent Working...")
  read_agent = build_read_agent()
  read_result = read_agent.invoke({
    'messages':[('user', f"""
            Based on the following search results about '{topic}',
            pick the most relevant URL and scrape it for deeper content.\n\n
            Search Results:\n{state['search_results'][:800]}  
      """)]
  })
  state['read_results'] = read_result['messages'][-1].content

  print("\nDrafting report...")

  combined_research = (
    f"SEARCH RESULTS : \n {state['search_results']} \n\n"
    f"DETAILED SCRAPED CONTENT : \n {state['read_results']}"
  )

  state['final_report'] = writer_chain.invoke({
    'topic':topic,
    'research': combined_research
  })
  print("\nCrtiquing report...")

  state['critic_report'] = critic_chain.invoke({
    'report': state['final_report']
  })
  return state



# if __name__ == "__main__":
#     topic = input("\n Enter a research topic : ")
#     research_report(topic)  