import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Edit, PlusCircle, FileX2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formFields = [
  { key: 'missingDocuments', label: 'Comma-Separated List Of Missing Documents', readOnly: false, isTextArea: true },
  { key: 'Property Address', label: 'Address Of The Property', readOnly: false, isTextArea: false },
  { key: 'Trade ID', label: 'Unique Trade Identifier', readOnly: false, isTextArea: false },
  { key: 'Agent Name', label: 'Name Of The Agent Handling The Property', readOnly: false, isTextArea: false },
  { key: 'Agent Email', label: 'Email Address Of The Agent', readOnly: false, isTextArea: false },
  { key: 'Agent Number (+) with country code extension', label: "Agent's Phone Number Including Country Code", readOnly: false, isTextArea: false },
  { key: 'CLOSING DATE', label: 'Closing Date Of The Transaction', readOnly: false, isTextArea: false },
  { key: 'Last Contacted Date (if any)', label: 'Date The Agent Was Last Contacted, If Available', readOnly: false, isTextArea: false },
];

const MissingDocuments = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [action, setAction] = useState<'add' | 'update' | null>(null);
  const [tradeId, setTradeId] = useState("");
  const [tradeData, setTradeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [originalMissingDocsKey, setOriginalMissingDocsKey] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser({ name: data.user.user_metadata?.full_name || data.user.email, email: data.user.email });
        setIsAuthenticated(true);
      } else if (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = async () => {
    if (!tradeId) {
      toast({ title: "Validation Error", description: "Please enter a Trade ID.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setTradeData(null);
    try {
      const numericTradeId = parseInt(tradeId, 10);
      if (isNaN(numericTradeId)) {
        toast({ title: "Invalid ID", description: "Trade ID must be a number.", variant: "destructive" });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await fetch('/api/webhook/search-trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tradeId: numericTradeId }),
      });

      const responseBody = await response.text();
      console.log("Search webhook response:", responseBody);

      if (!response.ok) {
        toast({ title: "Search Failed", description: `The server responded with an error: ${responseBody}`, variant: "destructive" });
        return;
      }

      if (!responseBody) {
        toast({ title: "Trade Not Found", description: "The specified trade ID could not be found.", variant: "destructive" });
        return;
      }

      const result = JSON.parse(responseBody);
      if (result.found && result.data) {
        const receivedData = result.data;
        const keyForMissingDocs = Object.keys(receivedData).find(k => k.toLowerCase().includes('missing documents'));

        const newData = { ...receivedData };

        if (keyForMissingDocs) {
            setOriginalMissingDocsKey(keyForMissingDocs);
            newData.missingDocuments = receivedData[keyForMissingDocs];
        }

        setTradeData(newData);
        toast({ title: "Trade Found", description: "The trade data has been loaded successfully." });
      } else {
        toast({ title: "Trade Not Found", description: "The specified trade ID could not be found.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error parsing response or searching for trade:", error);
      toast({ title: "Request Failed", description: "There was a network or parsing error.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!tradeData) return;
    setIsLoading(true);
    try {
      const dataToSend = { ...tradeData };

      if (originalMissingDocsKey && originalMissingDocsKey !== 'missingDocuments') {
        dataToSend[originalMissingDocsKey] = dataToSend.missingDocuments;
        delete dataToSend.missingDocuments;
      }

      dataToSend['Trade ID'] = parseInt(dataToSend['Trade ID'], 10);

      const response = await fetch('/api/webhook/9238431c-e75e-46c8-930a-85c03a326cb4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([dataToSend]),
      });

      const responseBody = await response.text();
      console.log("Update webhook response:", responseBody);

      if (response.ok) {
        toast({ title: "Changes Saved", description: "The trade data has been updated successfully." });
      } else {
        toast({ title: "Save Failed", description: `The server responded with an error: ${responseBody}`, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({ title: "Request Failed", description: "A network error occurred while saving.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTradeData((prev: any) => ({ ...prev, [name]: value }));
  };

  const renderForm = () => {
    if (action === 'add') {
      return (
        <div className="w-full">
          <Button onClick={() => setAction(null)} variant="ghost" size="sm" className="mb-4"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfZbHduMd2JSgI7311WwM8LXjraGoW5Z1raklQbbPxapfh9qA/viewform?embedded=true" width="100%" height="1469" title="Add Record Form">Loading…</iframe>
        </div>
      );
    }
    if (action === 'update') {
      return (
        <div className="w-full">
          <Button onClick={() => { setAction(null); setTradeData(null); setTradeId(""); }} variant="ghost" size="sm" className="mb-4"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
          <div className="space-y-4">
            {!tradeData && (
              <div className="flex items-start gap-2">
                <Input type="number" placeholder="Enter Trade ID" value={tradeId} onChange={(e) => setTradeId(e.target.value)} className="max-w-sm" disabled={isLoading} />
                <Button onClick={handleSearch} disabled={isLoading} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg">
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            )}
            {tradeData && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Trade Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formFields.map((field) => (
                    <div
                      key={field.key}
                      className={`flex flex-col ${
                        field.isTextArea ? "md:col-span-2" : ""
                      } ${
                        field.key === 'missingDocuments'
                          ? "bg-red-100 p-2 rounded-lg"
                          : ""
                      }`}
                    >
                      <label
                        htmlFor={field.key}
                        className="text-sm font-medium text-gray-700 mb-1"
                      >
                        {field.label}
                      </label>
                      {field.isTextArea ? (
                        <Textarea
                          id={field.key}
                          name={field.key}
                          value={tradeData[field.key] ?? ""}
                          onChange={handleInputChange}
                          readOnly={field.readOnly || isLoading}
                          className="bg-white rounded-md p-2"
                          rows={4}
                        />
                      ) : (
                        <Input
                          id={field.key}
                          name={field.key}
                          value={tradeData[field.key] ?? ""}
                          onChange={handleInputChange}
                          readOnly={field.readOnly || isLoading}
                          className="bg-white rounded-md p-2"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleSaveChanges}
                  disabled={isLoading}
                  className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center space-x-4">
        <Button onClick={() => setAction('add')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"><PlusCircle className="w-5 h-5 mr-2" />Add a Record</Button>
        <Button onClick={() => setAction('update')} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg"><Edit className="w-5 h-5 mr-2" />Update a Record</Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isAuthenticated={isAuthenticated} user={user} onLogout={() => supabase.auth.signOut()} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/dashboard" className="text-blue-500 hover:underline mb-4 inline-block"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />Back to Dashboard</Button></Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center"><FileX2 className="w-8 h-8 text-blue-500" /></div>
            <div>
              <h1 className="text-3xl font-bold">Missing Documents</h1>
              <p className="text-lg text-gray-600">Identify and request missing documents from clients</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Instructions</CardTitle></CardHeader>
            <CardContent>
              <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS89_RHWF7CzKxM6pduM0Ag6xZ3PE6JdnRd2w4JC48Xcd3hbsBb8RDGAJpA7VRJZXuyV9QuqPPaBUEq/pubhtml?gid=1624864329&single=true&widget=true&headers=false" width="100%" height="600" title="Instructions Spreadsheet"></iframe>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>{action ? (action === 'add' ? 'Add Record' : 'Update Record') : 'Choose an Action'}</CardTitle></CardHeader>
            <CardContent className="min-h-[200px] flex items-center justify-center">{renderForm()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MissingDocuments;
