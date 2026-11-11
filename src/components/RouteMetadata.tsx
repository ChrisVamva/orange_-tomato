import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveSeoMetadata } from '../seo/metadata';

function setMeta(selector: string, attributes: Record<string, string>, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function RouteMetadata() {
  const location = useLocation();

  useEffect(() => {
    const metadata = resolveSeoMetadata(location.pathname);
    document.title = metadata.title;

    setMeta('meta[name="description"]', { name: 'description' }, metadata.description);
    setMeta('meta[name="robots"]', { name: 'robots' }, metadata.indexable ? 'index,follow' : 'noindex,follow');
    setMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
    setMeta('meta[property="og:title"]', { property: 'og:title' }, metadata.title);
    setMeta('meta[property="og:description"]', { property: 'og:description' }, metadata.description);
    setMeta('meta[property="og:url"]', { property: 'og:url' }, metadata.canonicalUrl);
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, metadata.imageUrl ? 'summary_large_image' : 'summary');
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, metadata.title);
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, metadata.description);

    if (metadata.imageUrl) {
      setMeta('meta[property="og:image"]', { property: 'og:image' }, metadata.imageUrl);
      setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, metadata.imageUrl);
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = metadata.canonicalUrl;
  }, [location.pathname]);

  return null;
}
