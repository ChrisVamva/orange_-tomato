import ReactMarkdown from 'react-markdown';
import dossier001 from '../data/dossier-001.md?raw';

export default function Article() {
  return (
    <div className="bg-[#F5F5F1] min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="brutalist-card bg-white max-w-4xl mx-auto p-8 md:p-12">
        <ReactMarkdown className="prose prose-lg prose-stone max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-[#FF4500] prose-a:font-bold prose-strong:text-[#8B0000]">
          {dossier001}
        </ReactMarkdown>
      </div>
    </div>
  );
}
