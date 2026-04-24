import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Therapist, Service, Article } from '../types';

interface DataContextType {
  therapists: Therapist[];
  services: Service[];
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [therapistsRes, servicesRes, articlesRes] = await Promise.all([
          supabase.from('therapists').select('*'),
          supabase.from('services').select('*'),
          supabase.from('articles').select('*')
        ]);

        if (therapistsRes.error) throw therapistsRes.error;
        if (servicesRes.error) throw servicesRes.error;
        if (articlesRes.error) throw articlesRes.error;

        // Map data from database mapping `image_url` back to camelCase
        setTherapists(therapistsRes.data.map(t => ({
          id: t.id,
          name: t.name,
          role: t.role,
          bio: t.bio,
          imageUrl: t.image_url
        })));

        setServices(servicesRes.data.map(s => ({
          id: s.id,
          title: s.title,
          description: s.description,
          duration: s.duration,
          price: s.price,
          iconType: s.icon_type,
          imageUrl: s.image_url
        })));

        setArticles(articlesRes.data.map(a => ({
          id: a.id,
          title: a.title,
          summary: a.summary,
          content: a.content,
          category: a.category,
          date: a.date,
          imageUrl: a.image_url
        })));

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ therapists, services, articles, isLoading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
