import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useFavorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const toggleFavorite = async (garageId?: string, postId?: string) => {
    if (!user) {
      toast({
        title: "Giriş Gerekli",
        description: "Favoriye eklemek için giriş yapmalısınız.",
        variant: "destructive"
      });
      return false;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.rpc('toggle_favorite', {
        user_id_param: user.id,
        garage_id_param: garageId || null,
        post_id_param: postId || null
      });

      if (error) {
        console.error('Favorite toggle error:', error);
        toast({
          title: "Hata",
          description: "Favori durumu güncellenirken bir hata oluştu.",
          variant: "destructive"
        });
        return false;
      }

      const isFavorited = data as boolean;
      
      toast({
        title: isFavorited ? "Favorilere Eklendi" : "Favorilerden Çıkarıldı",
        description: isFavorited 
          ? "İçerik favorilerinize eklendi." 
          : "İçerik favorilerinizden çıkarıldı."
      });

      return isFavorited;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Hata",
        description: "Beklenmeyen bir hata oluştu.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkIsFavorited = async (garageId?: string, postId?: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq(garageId ? 'garage_id' : 'post_id', garageId || postId)
        .maybeSingle();

      if (error) {
        console.error('Check favorite error:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Unexpected error checking favorite:', error);
      return false;
    }
  };

  return {
    toggleFavorite,
    checkIsFavorited,
    isLoading
  };
};