
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ResearcherAgent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Awaiting your research topic...');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // This is our "Tool" - a mock function to simulate fetching web data.
  const searchWebTool = async (topic: string): Promise<string> => {
    setStatus(`Tool Call: Searching the web for "${topic}"...`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency

    const mockData = {
        "decentralized compute": "Decentralized compute refers to a network of distributed computers that share resources to perform tasks without a central authority. Projects like Nosana leverage this model to provide censorship-resistant and cost-effective computing power for AI and other intensive workloads. It contrasts with traditional cloud providers like AWS or Google Cloud by distributing trust and control among participants.",
        "ai agents": "AI agents are autonomous programs that can perceive their environment, make decisions, and take actions to achieve specific goals. They often use Large Language Models (LLMs) for reasoning and can be equipped with 'tools' (functions) to interact with external systems, like APIs or databases. Frameworks like Mastra help orchestrate these agents and their tool-calling capabilities.",
    };
    
    const lowerCaseTopic = topic.toLowerCase();
    if (lowerCaseTopic.includes("decentralized compute")) {
      return mockData["decentralized compute"];
    } else if (lowerCaseTopic.includes("ai agents")) {
      return mockData["ai agents"];
    } else {
      return `Found several articles about "${topic}". The core idea revolves around its impact on modern technology. It is a rapidly evolving field with significant investment and research focus. Key applications are emerging in various industries, from finance to healthcare.`;
    }
  };

  const handleResearch = async () => {
    if (!query.trim()) {
      setError('Please enter a topic to research.');
      return;
    }

    setIsLoading(true);
    setResult('');
    setError(null);

    try {
      const searchResult = await searchWebTool(query);

      setStatus('Analyzing search results with Gemini...');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

      const prompt = `Based on the following information, generate a concise summary report for the user's query: "${query}". Format the output in Markdown with a title, a brief paragraph, and 3-4 bullet points highlighting the key takeaways.\n\nInformation Found:\n${searchResult}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      setResult(response.text);
      setStatus('Research complete. Report generated below.');

    } catch (err) {
      console.error(err);
      setError('An error occurred during the research process. Please check the console.');
      setStatus('Task failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <header className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">AI Web Researcher Agent</h1>
        <p className="text-lg text-gray-400">
          An intelligent AI agent that performs web searches and summarizes findings.
        </p>
      </header>

      <div className="w-full bg-slate-800/50 rounded-xl border border-slate-700 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'What is decentralized compute?'"
            className="flex-grow p-3 bg-slate-800 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors disabled:opacity-50"
            disabled={isLoading}
          />
          <button
            onClick={handleResearch}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Researching...
              </>
            ) : (
              'Start Research'
            )}
          </button>
        </div>
        
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}

        <div className="mt-6 border-t border-slate-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-300 mb-2">Agent Status</h2>
          <p className="text-cyan-400 bg-slate-800 p-3 rounded-md font-mono text-sm">{status}</p>
        </div>

        {result && (
          <div className="mt-6 border-t border-slate-700 pt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Research Report</h2>
            <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-ul:text-gray-300 bg-slate-800 p-4 rounded-md">
              {/* Basic Markdown rendering for simplicity */}
              {result.split('\n').map((line, i) => {
                if (line.startsWith('#')) {
                  return <h3 key={i} className="text-xl font-bold mt-2 mb-2">{line.replace(/#/g, '').trim()}</h3>;
                }
                if (line.startsWith('*')) {
                  return <li key={i} className="ml-4 list-disc">{line.replace('*', '').trim()}</li>;
                }
                return <p key={i}>{line}</p>;
              })}
            </div>
          </div>
        )}
      </div>
      <footer className="w-full text-center my-8 text-gray-500">
          <p className="mt-4 text-sm">This is a simulated agent. Tool calling is mocked for demonstration purposes.</p>
      </footer>
    </div>
  );
};

export default ResearcherAgent;
