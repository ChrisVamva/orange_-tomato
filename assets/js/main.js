document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Table of Contents generator
  const postContent = document.querySelector('.post-content');
  const toc = document.getElementById('toc');
  if (postContent && toc) {
    const headings = postContent.querySelectorAll('h2, h3');
    headings.forEach((heading, idx) => {
      const id = heading.id || `heading-${idx}`;
      heading.id = id;
      
      const li = document.createElement('li');
      li.style.marginLeft = heading.tagName === 'H3' ? '16px' : '0';
      
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = heading.textContent;
      
      li.appendChild(a);
      toc.appendChild(li);
    });
    if(headings.length === 0) {
      document.querySelector('.sidebar-sticky')?.remove();
    }
  }

  // Search Logic (Simple Custom Implementation)
  const searchToggle = document.getElementById('search-toggle');
  const searchClose = document.getElementById('search-close');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');
  let searchData = [];

  // Toggle Search Modal
  const openSearch = () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
    if (searchData.length === 0) fetchSearchData();
  };

  const closeSearch = () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    resultsContainer.innerHTML = '';
  };

  searchToggle?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);
  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay?.classList.contains('active')) {
      closeSearch();
    }
  });

  // Fetch search index
  const fetchSearchData = async () => {
    try {
      // Assuming search.json is at the site root
      const response = await fetch('/search.json');
      searchData = await response.json();
    } catch (err) {
      console.error('Failed to load search.json', err);
    }
  };

  // Perform search
  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    resultsContainer.innerHTML = '';
    
    if (!query) return;

    const results = searchData.filter(post => {
      return post.title.toLowerCase().includes(query) || 
             post.tags.toLowerCase().includes(query) || 
             post.category.toLowerCase().includes(query);
    });

    if (results.length === 0) {
      resultsContainer.innerHTML = '<li><p style="padding: 16px 24px;">No results found.</p></li>';
      return;
    }

    results.slice(0, 10).forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${post.url}">
          <h3>${post.title}</h3>
          <p>${post.category} • ${post.date}</p>
        </a>
      `;
      resultsContainer.appendChild(li);
    });
  });
});
