
import React from 'react';
import ChallengePhaseCard from './ChallengePhaseCard';
import AgentIdeaCard from './AgentIdeaCard';
import ResourceLink from './ResourceLink';
import ChecklistItem from './ChecklistItem';
import { CodeIcon, DockerIcon, DeployIcon, RobotIcon, WebResearchIcon, DevOpsIcon, ContentCreatorIcon, SmartSearchIcon, SupportBotIcon } from './Icons';

const HomePage: React.FC = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-12">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                    Welcome to the <span className="text-cyan-400">AI Agent</span> Challenge
                </h2>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
                    Build, test, and deploy your own AI agent using cutting-edge decentralized compute and agent frameworks. Let's build the future, together.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <a href="#/researcher" className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors">
                        Try Researcher Agent
                    </a>
                    <a href="#/assistant" className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-md hover:bg-slate-600 transition-colors">
                        Try Code Assistant
                    </a>
                </div>
            </section>
            
            {/* Challenge Phases */}
            <section>
                <h3 className="text-3xl font-bold text-center text-white mb-8">Challenge Phases</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    <ChallengePhaseCard 
                        icon={<CodeIcon />}
                        title="Phase 1: Build"
                        description="Develop your AI agent. Define its purpose, choose its tools, and write the core logic."
                        details={[
                            "Familiarize with Gemini API",
                            "Implement tool-calling functions",
                            "Set up your development environment",
                            "Test agent's core functionality"
                        ]}
                    />
                    <ChallengePhaseCard 
                        icon={<DockerIcon />}
                        title="Phase 2: Containerize"
                        description="Package your agent into a portable and reproducible Docker container."
                        details={[
                            "Write a Dockerfile for your agent",
                            "Build and test the Docker image",
                            "Optimize image for size and speed",
                            "Push image to a container registry"
                        ]}
                    />
                    <ChallengePhaseCard 
                        icon={<DeployIcon />}
                        title="Phase 3: Deploy"
                        description="Deploy your agent on the Nosana network for decentralized, censorship-resistant execution."
                        details={[
                            "Configure Nosana deployment manifest",
                            "Submit your job to the network",
                            "Monitor execution and logs",
                            "Showcase your live agent!"
                        ]}
                    />
                </div>
            </section>

            {/* Agent Ideas */}
            <section>
                <h3 className="text-3xl font-bold text-center text-white mb-8">Agent Ideas & Inspiration</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AgentIdeaCard icon={<WebResearchIcon />} title="Web Researcher" description="An agent that can browse the web, gather information, and compile reports on a given topic." />
                    <AgentIdeaCard icon={<DevOpsIcon />} title="DevOps Assistant" description="Automate CI/CD tasks, monitor infrastructure, or manage deployments with a specialized agent." />
                    <AgentIdeaCard icon={<ContentCreatorIcon />} title="Content Creator" description="Generate blog posts, social media updates, or marketing copy based on prompts and keywords." />
                    <AgentIdeaCard icon={<SmartSearchIcon />} title="Smart Search" description="An agent that provides summarized answers from internal documents or knowledge bases." />
                    <AgentIdeaCard icon={<SupportBotIcon />} title="Customer Support" description="Triage support tickets, answer common questions, and escalate issues to human agents." />
                    <AgentIdeaCard icon={<RobotIcon />} title="Personal Assistant" description="Manage calendars, set reminders, and perform tasks based on natural language commands." />
                </div>
            </section>
            
            {/* Resources and Checklist */}
            <section className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-8">Helpful Resources</h3>
                    <div className="space-y-4">
                        <ResourceLink href="https://docs.nosana.io/" text="Nosana Documentation" />
                        <ResourceLink href="https://ai.google.dev/docs" text="Google Gemini API Docs" />
                        <ResourceLink href="https://docs.docker.com/" text="Docker Documentation" />
                        <ResourceLink href="https://github.com/nosana-ci/agent-challenge" text="Official Challenge GitHub Repo" />
                    </div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white mb-8">Submission Checklist</h3>
                    <div className="space-y-2 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <ChecklistItem text="Agent source code is in a public Git repository." />
                        <ChecklistItem text="A Dockerfile is included to build the agent." />
                        <ChecklistItem text="README includes instructions on running the agent." />
                        <ChecklistItem text="A short demo video of the agent is provided." />
                        <ChecklistItem text="Submission form is completed and sent." />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
