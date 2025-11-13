import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, User, Bot } from "lucide-react";

const RagChatbotTest = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage = { role: "user", content: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage("");
    setIsSending(true);

    // Replace with your actual RAG chatbot API endpoint
    // For demonstration, we'll use a mock response
    setTimeout(() => {
      const botResponse = {
        role: "bot",
        content: `This is a mock response to: "${message}". In a real application, this would be a response from the RAG chatbot based on the provided knowledge base.`
      };
      setChatHistory(prev => [...prev, botResponse]);
      setIsSending(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-primary-foreground">
      <header className="bg-primary p-4 text-primary-foreground shadow-md">
        <h1 className="text-2xl font-bold">RAG Chatbot Test</h1>
      </header>

      <main className="flex-1 flex flex-col p-4 md:p-6 space-y-4">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4 border rounded-lg bg-muted/20">
              <div className="space-y-4">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex items-start gap-3 ${chat.role === "user" ? "justify-end" : ""}`}>
                    {chat.role === "bot" && (
                      <Avatar className="w-8 h-8 border">
                        <AvatarFallback><Bot size={18} /></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${chat.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <p className="text-sm">{chat.content}</p>
                    </div>
                    {chat.role === "user" && (
                      <Avatar className="w-8 h-8 border">
                        <AvatarFallback><User size={18} /></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isSending && (
                    <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8 border">
                            <AvatarFallback><Bot size={18} /></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-3 max-w-xs lg:max-w-md bg-muted text-muted-foreground animate-pulse">
                            <p className="text-sm">...</p>
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
            <div className="mt-4 flex items-center gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isSending}
              />
              <Button onClick={handleSendMessage} disabled={isSending}>
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RagChatbotTest;
