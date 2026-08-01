export function getFaviconUrl(urlOrDomain: string): string {
  if (!urlOrDomain) return 'https://www.google.com/s2/favicons?domain=example.com&sz=128';
  try {
    let domain = urlOrDomain.trim();
    if (domain.startsWith('http://') || domain.startsWith('https://')) {
      const parsed = new URL(domain);
      domain = parsed.hostname;
    }
    domain = domain.replace(/^www\./, '').split('/')[0].split('?')[0];
    if (!domain) domain = 'example.com';
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
  } catch {
    return 'https://www.google.com/s2/favicons?domain=example.com&sz=128';
  }
}
