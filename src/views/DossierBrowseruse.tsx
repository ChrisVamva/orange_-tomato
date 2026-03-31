import ReactMarkdown from 'react-markdown';
import content from '../content/watchdog/browser-use-026.md?raw';
import manifestoFeature from '../assets/manifesto-feature.jpg.png';

export default function DossierBrowseruse() {
  return (
    <div className="min-h-screen bg-[#F5F5F1]">
      {/* HERO SECTION */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
        <img 
          src={manifestoFeature} 
          alt="BROWSER-USE"
          className="w-full h-full object-cover"
        />
        
        {/* TITLE OVERLAY */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 border-4 border-black">
              <span className="bg-black text-white px-3 py-1 font-mono text-sm font-bold uppercase tracking-widest block w-fit mb-4">
                THREAT DOSSIER // BROWSER-USE-026
              </span>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] text-black mb-4">
                BROWSER-USE
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold uppercase text-[#FF4500] tracking-tight">
                Vision-Based Web Automation
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* THE READING ROOM */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* AUTHOR SIDEBAR - Desktop Only */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-8 space-y-6">
              <div className="brutalist-card bg-white p-6 border-4 border-black">
                <div className="space-y-4">
                  <div className="text-sm font-bold uppercase tracking-widest text-gray-600">
                    THREAT LEVEL
                  </div>
                  <div className="text-xl font-black text-red-600">
                    CRITICAL
                  </div>
                  <div className="border-t-2 border-black pt-4">
                    <div className="text-sm font-bold uppercase tracking-widest text-gray-600">
                      TOMATO SCORE
                    </div>
                    <div className="text-lg font-mono text-black">
                      9/10
                    </div>
                  </div>
                  <div className="border-t-2 border-black pt-4">
                    <div className="text-sm font-bold uppercase tracking-widest text-gray-600">
                      CATEGORY
                    </div>
                    <div className="text-lg font-mono text-black">
                      BROWSER
                    </div>
                  </div>
                  <div className="border-t-2 border-black pt-4">
                    <div className="text-sm font-bold uppercase tracking-widest text-gray-600">
                      STATUS
                    </div>
                    <div className="text-lg font-mono text-black">
                      ACTIVE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-9">
            <div className="max-w-3xl mx-auto">
              {/* Mobile Threat Info */}
              <div className="lg:hidden brutalist-card bg-white p-6 mb-8 border-4 border-black">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold uppercase tracking-widest text-red-600">
                      CRITICAL THREAT • 9/10
                    </div>
                    <div className="text-lg font-mono text-black">
                      BROWSER • ACTIVE
                    </div>
                  </div>
                </div>
              </div>

              {/* ARTICLE CONTENT */}
              <div className="prose prose-xl prose-stone max-w-none font-serif leading-relaxed">
                <ReactMarkdown 
                  components={{
                    h1: ({children}) => <h1 className="font-black uppercase tracking-tight text-black border-b-4 border-black pb-2">{children}</h1>,
                    h2: ({children}) => <h2 className="font-black uppercase tracking-tight text-black border-b-4 border-black pb-2">{children}</h2>,
                    h3: ({children}) => <h3 className="font-black uppercase tracking-tight text-black border-b-4 border-black pb-2">{children}</h3>,
                    p: ({children}) => <p className="text-black leading-relaxed text-xl">{children}</p>,
                    a: ({children, href}) => <a href={href} className="text-[#FF4500] font-bold no-underline hover:underline">{children}</a>,
                    strong: ({children}) => <strong className="text-[#8B0000] font-bold">{children}</strong>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-black bg-gray-100 p-4 font-mono">{children}</blockquote>,
                    code: ({children}) => <code className="bg-black text-white px-2 py-1 text-sm">{children}</code>,
                    pre: ({children}) => <pre className="bg-black text-white p-6 font-mono text-sm">{children}</pre>,
                    ul: ({children}) => <ul className="text-black">{children}</ul>,
                    ol: ({children}) => <ol className="text-black">{children}</ol>,
                    li: ({children}) => <li className="text-black text-xl">{children}</li>
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
