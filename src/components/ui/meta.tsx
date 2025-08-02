import { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const MetaTags = ({ 
  title = "sonvites.net - Sanal Garajını Oluştur",
  description = "Araç tutkunlarının buluşma noktası. Sanal garajını oluştur, modifiyelerini paylaş, hikayeni anlat.",
  image = "https://sonvites.net/og-image.png",
  url = "https://sonvites.net",
  type = "website"
}: MetaTagsProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateMetaName = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaName('description', description);
    
    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    
    // Twitter tags
    updateMetaName('twitter:card', 'summary_large_image');
    updateMetaName('twitter:title', title);
    updateMetaName('twitter:description', description);
    updateMetaName('twitter:image', image);

  }, [title, description, image, url, type]);

  return null;
};

export default MetaTags;