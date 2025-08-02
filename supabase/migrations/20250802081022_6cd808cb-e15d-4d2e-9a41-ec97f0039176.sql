-- Create favorites functionality
-- Note: favorites table already exists, let's add some missing triggers and functions

-- Create function to handle favorite toggle
CREATE OR REPLACE FUNCTION public.toggle_favorite(
  user_id_param UUID,
  garage_id_param UUID DEFAULT NULL,
  post_id_param UUID DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  favorite_exists boolean;
BEGIN
  -- Check if favorite already exists
  SELECT EXISTS(
    SELECT 1 FROM public.favorites 
    WHERE user_id = user_id_param 
    AND (garage_id = garage_id_param OR post_id = post_id_param)
  ) INTO favorite_exists;
  
  IF favorite_exists THEN
    -- Remove favorite
    DELETE FROM public.favorites 
    WHERE user_id = user_id_param 
    AND (garage_id = garage_id_param OR post_id = post_id_param);
    
    -- Update likes count
    IF garage_id_param IS NOT NULL THEN
      UPDATE public.garages 
      SET likes_count = GREATEST(0, likes_count - 1)
      WHERE id = garage_id_param;
    END IF;
    
    IF post_id_param IS NOT NULL THEN
      UPDATE public.posts 
      SET likes_count = GREATEST(0, likes_count - 1)
      WHERE id = post_id_param;
    END IF;
    
    RETURN false; -- Unfavorited
  ELSE
    -- Add favorite
    INSERT INTO public.favorites (user_id, garage_id, post_id)
    VALUES (user_id_param, garage_id_param, post_id_param);
    
    -- Update likes count
    IF garage_id_param IS NOT NULL THEN
      UPDATE public.garages 
      SET likes_count = likes_count + 1
      WHERE id = garage_id_param;
    END IF;
    
    IF post_id_param IS NOT NULL THEN
      UPDATE public.posts 
      SET likes_count = likes_count + 1
      WHERE id = post_id_param;
    END IF;
    
    RETURN true; -- Favorited
  END IF;
END;
$$;