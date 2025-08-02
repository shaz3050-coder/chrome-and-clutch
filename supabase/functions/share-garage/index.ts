import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ShareRequest {
  garageId: string;
  title: string;
  description: string;
  imageUrl: string;
  platform: 'instagram' | 'twitter' | 'whatsapp' | 'copy';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { garageId, title, description, imageUrl, platform }: ShareRequest = await req.json();
    
    const baseUrl = "https://sonvites.net";
    const shareUrl = `${baseUrl}/garage/${garageId}`;
    
    let shareLink = "";
    
    switch (platform) {
      case 'instagram':
        // Instagram doesn't support direct sharing with links, return story template
        shareLink = `instagram://story-camera`;
        break;
        
      case 'twitter':
        const twitterText = `${title} - ${description} ${shareUrl}`;
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
        break;
        
      case 'whatsapp':
        const whatsappText = `🏎️ ${title}\n\n${description}\n\n👉 ${shareUrl}`;
        shareLink = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
        break;
        
      case 'copy':
        shareLink = shareUrl;
        break;
        
      default:
        shareLink = shareUrl;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        shareLink,
        shareUrl 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
    
  } catch (error: any) {
    console.error("Error in share function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);