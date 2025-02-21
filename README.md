# gonext

**GoNext** is a GenAI-powered assistant tailored for League of Legends players, delivering real-time and personalized strategies, matchups, synergies, and builds. By harnessing the Riot API, GoNext retrieves live game data—covering both allied and enemy players—and employs large language models to offer context-specific guidance for every match.

---

## Features

- **GenAI-powered Chatbot**  
  A knowledge-enriched chatbot that adapts to the current game state. It can suggest item builds, devise game plans, and answer any in-game questions in natural language.

- **Win Chance Estimation**  
  Advanced AI calculates the probability of victory, factoring in the chosen champions and player performance data.

- **Game Overview**  
  An LLM-generated concise summary that highlights the key strategic considerations for each match.

- **Live Game Analysis**  
  Real-time insights powered by AI and integrated data from the Riot API.

- **Match History & Rank Analysis**  
  Explore detailed match histories and rank information for all players with a single click.

- **Multi-Language Support**  
  Obtain AI-driven insights in various supported languages (English, Korean, Chinese, Spanish, Bulgarian, etc.).

- **Seamless LLM Switch**  
  Instantly switch between GPT-4o, GPT-4o-mini, and Gemini 1.5 Flash for optimal performance and cost efficiency.

---

ML side available at [GoNext ML GitHub Repository](https://github.com/kostadindev/gonext-ml)

![image](https://github.com/user-attachments/assets/6d06a18f-f108-4bef-b45b-9c199a9d62c3)

![image](https://github.com/user-attachments/assets/dacc5906-e871-4150-a780-723c81e2d362)


![image](https://github.com/user-attachments/assets/9d398321-8a74-4d2e-825d-c9f5fca7e1e9)


![image](https://github.com/user-attachments/assets/961bc52b-f289-40e1-8e7d-0d1c48178033)

![image](https://github.com/user-attachments/assets/0c7c618f-7c1f-408b-80ad-6a77fb56e626)

Stack:

- **UI:** Built with React, styled using Ant Design and Tailwind CSS for a sleek and responsive interface.  
- **API:** Node.js with the Express framework, seamlessly interfacing with the Riot API for real-time game data.  
- **Machine Learning API:** FastAPI integrated with LangChain, leveraging OpenAI API and Google AI Studio for advanced AI-driven insights.  
- **Databases:** PostgreSQL for data analytics, MongoDB for flexible general-purpose storage, and Redis for high-performance caching.
