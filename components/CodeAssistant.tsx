import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MagicWandIcon } from './Icons';

const CodeAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCode = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setError('API key is not configured. Please ensure the API_KEY is set.');
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          systemInstruction: "You are an expert coding assistant. Generate clean, efficient, and well-documented code based on the user's request. Only output the code itself, without any conversational text or explanations unless specifically asked. Format the output as a clean code block.",
        },
      });
      
      const codeText = response.text.replace(/```[\w]*\n/g, '').replace(/```/g, '');
      setGeneratedCode(codeText.trim());

    } catch (err) {
      console.error(err);
      setError('Failed to generate code. Please check the console and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left mb-6">
          <div className="bg-slate-700 p-3 rounded-lg text-purple-400 mb-4 sm:mb-0 sm:mr-4">
              <MagicWandIcon />
          </div>
          <div>
              <h2 className="text-3xl font-bold text-white">AI Coding Assistant</h2>
              <p className="text-gray-400 mt-1">
                  Need a code snippet? Describe what you want to build and let the AI agent assist you.
              </p>
          </div>
      </div>

      <div className="flex flex-col space-y-4 mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Create a React component for a responsive pricing table'"
          className="w-full h-24 p-3 bg-slate-800 border border-slate-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerateCode}
          disabled={isLoading}
          className="w-full md:w-auto md:self-end px-6 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Code'
          )}
        </button>
      </div>
      
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <div className="w-full bg-black/50 rounded-lg border border-slate-700 min-h-[200px] p-4 font-mono text-sm text-gray-200 overflow-x-auto">
        {generatedCode ? (
          <pre><code>{generatedCode}</code></pre>
        ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
                {isLoading ? 'Agent is thinking...' : 'Generated code will appear here...'}
            </div>
        )}
      </div>
    </div>
  );
};

export default CodeAssistant;