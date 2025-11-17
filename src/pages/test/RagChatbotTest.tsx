
import React, { useEffect } from 'react';
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

const RagChatbotTest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add the n8n chat stylesheet to the document head
    const style = document.createElement('link');
    style.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);

    // Dynamically import the chat creation function and initialize the chat
    let chat;
    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
      .then(module => {
        chat = module.createChat({
          webhookUrl: 'https://n8n.srv856353.hstgr.cloud/webhook/f9afdfb5-0e27-4efd-8cb8-6213f26de3a1/chat'
        });
      })
      .catch(e => console.error("Failed to load n8n chat module", e));

    // Cleanup function to run when the component unmounts
    return () => {
      document.head.removeChild(style);
      // The createChat function returns an object with a `destroy` method to clean up the widget
      if (chat && chat.destroy) {
        chat.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        isAuthenticated={true}
        user={{ name: 'User', email: 'user@example.com' }}
        onLogout={handleLogout}
      />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-primary mb-4">RAG Chatbot Test Page</h1>
        <p className="text-muted-foreground">
          The n8n chat widget has been loaded on this page. You should see a chat icon, likely in the bottom-right corner, to begin your conversation.
        </p>
      </div>
    </div>
  );
};

export default RagChatbotTest;
