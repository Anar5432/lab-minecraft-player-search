export const metadata = {
  title: "About | Minecraft Player Search",
  description: "Learn more about the Minecraft Player Search app.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500 mt-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white">About the Project</h1>
        <p className="text-lg text-zinc-400">
          A small application built to learn Next.js navigation and routing.
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-md space-y-6">
        <div>
          <h2 className="text-xl font-bold text-green-400 mb-2">What does this app do?</h2>
          <p className="text-zinc-300 leading-relaxed">
            The Minecraft Player Searcher allows you to look up any valid Minecraft player by their username. 
            It retrieves the player's unique identifier (UUID) and fetches their currently active in-game skin, 
            displaying it directly in your browser. It supports both Java and Bedrock editions.
          </p>
        </div>

        <div className="border-t border-zinc-800 pt-6">
          <h2 className="text-xl font-bold text-green-400 mb-2">Technical Details</h2>
          <p className="text-zinc-300 leading-relaxed">
            This project was built using <strong>Next.js (App Router)</strong> and <strong>Tailwind CSS</strong>. 
            It demonstrates the differences between Server and Client Components, client-side transitions, and 
            efficient data fetching patterns in modern React.
          </p>
        </div>

        <div className="border-t border-zinc-800 pt-6">
          <h2 className="text-xl font-bold text-green-400 mb-2">Credits & API</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            A special thanks to the incredible API that makes this possible:
          </p>
          <a 
            href="https://mc-api.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-lg border border-zinc-700 transition-colors"
          >
            <span>mc-api.io</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
