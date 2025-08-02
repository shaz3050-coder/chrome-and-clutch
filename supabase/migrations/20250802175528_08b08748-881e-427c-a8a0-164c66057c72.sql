-- Create comments table for user feedback system
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  garage_id UUID REFERENCES public.garages(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT check_comment_target CHECK (
    (garage_id IS NOT NULL AND post_id IS NULL) OR 
    (garage_id IS NULL AND post_id IS NOT NULL)
  )
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- RLS policies for comments
CREATE POLICY "Public comments are viewable by everyone" 
ON public.comments FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create comments" 
ON public.comments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
ON public.comments FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
ON public.comments FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_comments_garage_id ON public.comments(garage_id);
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_comments_user_id ON public.comments(user_id);
CREATE INDEX idx_comments_created_at ON public.comments(created_at DESC);