import { Link, useParams } from 'react-router-dom';
import { posts } from '../data/posts';
import type { Post } from '../data/posts';

export const PostDetail = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <main className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-8 py-32">
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'} mb-4`}>
            Post not found
          </h1>
          <Link to="/" className="text-tomato hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-8 py-32">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-16">
          <Link 
            to="/" 
            className={`flex items-center space-x-2 text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400 hover:text-tomato' : 'text-zinc-500 hover:text-tomato'} transition-colors`}
          >
            <span>←</span>
            <span>Back to Reports</span>
          </Link>
          <div className="flex items-center space-x-6">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {post.category.replace('-', ' ')}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {post.readTime} MIN READ
            </span>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-16">
          <div className="flex items-center space-x-4 mb-6">
            <span className="px-3 py-1 bg-tomato text-white text-[10px] font-black uppercase tracking-widest">
              {post.featured ? 'FEATURED' : 'REPORT'}
            </span>
            <time className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </div>
          
          <h1 className={`text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            {post.title}
          </h1>
          
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} font-medium leading-tight tracking-tight mb-8`}>
            {post.subtitle}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${isDarkMode ? 'border-zinc-700 text-zinc-400' : 'border-zinc-300 text-zinc-600'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article className={`prose prose-lg max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
          <div 
            className={`${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'} leading-relaxed space-y-6`}
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </article>

        {/* Orange Tomato Score */}
        <div className={`mt-24 p-8 border-2 ${isDarkMode ? 'border-zinc-700 bg-zinc-800' : 'border-zinc-900 bg-zinc-50'}`}>
          <h2 className={`text-2xl font-black tracking-tighter mb-6 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            The Orange Tomato Score
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Market Viability
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div className="h-full bg-tomato rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>9.2/10</span>
              </div>
            </div>
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Technical Feasibility
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div className="h-full bg-tomato rounded-full" style={{ width: '87%' }}></div>
                </div>
                <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>8.7/10</span>
              </div>
            </div>
            <div>
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Competitive Advantage
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <div className="h-full bg-tomato rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>9.5/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <section className="mt-24">
          <h2 className={`text-sm font-black uppercase tracking-widest mb-12 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
            Related Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {posts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link key={relatedPost.id} to={`/post/${relatedPost.id}`} className="group">
                  <article className="cursor-pointer">
                    <h3 className={`text-lg font-bold tracking-tight mb-2 ${isDarkMode ? 'text-white group-hover:text-tomato' : 'text-zinc-900 group-hover:text-tomato'} transition-colors`}>
                      {relatedPost.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} mb-3`}>
                      {relatedPost.subtitle}
                    </p>
                    <div className={`flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      <span>{relatedPost.readTime} MIN READ</span>
                      <span>•</span>
                      <span>Continue →</span>
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
};
