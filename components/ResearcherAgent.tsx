import React, { useState } from 'react';

// Mock Nosana SDK for demonstration purposes
class Nosana {
  async run({ agent, payload }: { agent: string; payload: any }) {
    console.log(`[Nosana Mock] Running job on agent "${agent}" with payload:`, payload);
    const jobId = `job-${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate network delay for job submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      id: jobId,
      result: this._getMockResult(jobId, payload)
    };
  }

  // Simulate polling for a result
  _getMockResult(jobId: string, payload: any) {
    return new Promise(resolve => {
        // Simulate decentralized compute time
        setTimeout(() => {
            console.log(`[Nosana Mock] Job ${jobId} finished.`);
            const responseText = `### Research Summary: ${payload.query}\n\nBased on the simulated web search, **${payload.query}** is a key concept in modern technology. It represents a shift towards new paradigms and has significant implications for future development.\n\n*   **Key takeaway 1:** Major advancements have been made in recent years.\n*   **Key takeaway 2:** Adoption is growing across multiple industries.\n*   **Key takeaway 3:** Further research and development are ongoing.`;
            resolve(responseText);
        }, 4000);
    });
  }
}


const ResearcherAgent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('Awaiting your research topic...');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleResearch = async () => {
    if (!query.trim()) {
      setError('Please enter a topic to research.');
      return;
    }

    setIsLoading(true);
    setResult('');
    setError(null);
    setJobId(null);

    try {
      setStatus('Submitting job to the Nosana network...');
      const nosana = new Nosana();
      
      const job = await nosana.run({
          agent: 'research-agent-v1',
          payload: { query }
      });
      
      setJobId(job.id);
      setStatus(`Job [${job.id}] submitted. Waiting for result from the decentralized grid...`);

      const jobResult = await job.result as string;
      
      setResult(jobResult);
      setStatus(`Job [${job.id}] complete. Report generated below.`);

    } catch (err) {
      console.error(err);
      setError('An error occurred while communicating with the Nosana network.');
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
          Submit your research topic to the Nosana decentralized compute network.
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
                Processing on Nosana...
              </>
            ) : (
              'Run Job on Nosana'
            )}
          </button>
        </div>
        
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}

        <div className="mt-6 border-t border-slate-700 pt-6">
          <h2 className="text-lg font-semibold text-gray-300 mb-2">Agent Status</h2>
          <p className="text-cyan-400 bg-slate-800 p-3 rounded-md font-mono text-sm break-words">{status}</p>
        </div>

        {result && (
          <div className="mt-6 border-t border-slate-700 pt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Research Report</h2>
            <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-ul:text-gray-300 bg-slate-800 p-4 rounded-md">
              {/* Basic Markdown rendering for simplicity */}
              {result.split('\n').map((line, i) => {
                if (line.startsWith('###')) {
                  return <h3 key={i} className="text-xl font-bold mt-2 mb-2">{line.replace(/###/g, '').trim()}</h3>;
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
          <p className="mt-4 text-sm">Jobs are processed on a simulated Nosana network for this demo.</p>
      </footer>
    </div>
  );
};

export default ResearcherAgent;