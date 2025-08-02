import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, User, Heart, Reply } from "lucide-react";

interface CommentsProps {
  garageId?: string;
  postId?: string;
}

export const Comments = ({ garageId, postId }: CommentsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [garageId, postId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setComments([]); // Temporary - will implement full functionality later
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (content: string, parentId?: string) => {
    if (!content.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          content: content.trim(),
          user_id: user.id,
          garage_id: garageId || null,
          post_id: postId || null,
          parent_id: parentId || null
        }]);

      if (error) {
        toast({ title: "Hata", description: "Yorum eklenirken bir hata oluştu.", variant: "destructive" });
        return;
      }

      toast({ title: "Başarılı!", description: "Yorumunuz eklendi." });
      
      if (parentId) {
        setReplyContent("");
        setReplyingTo(null);
      } else {
        setNewComment("");
      }
      
      fetchComments();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-32 bg-muted rounded-lg mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="garage-card">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Textarea 
              placeholder={user ? "Yorumunuzu yazın..." : "Yorum yapmak için giriş yapmalısınız..."}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
              disabled={!user || isSubmitting}
            />
            <div className="flex justify-end">
              <Button 
                onClick={() => handleSubmitComment(newComment)}
                disabled={!newComment.trim() || !user || isSubmitting}
                className="btn-primary"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {isSubmitting ? "Gönderiliyor..." : "Yorum Yap"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments will be displayed here when available */}
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">
          Henüz yorum yapılmamış. İlk yorumu sen yap!
        </p>
      </div>
    </div>
  );
};

export default Comments;