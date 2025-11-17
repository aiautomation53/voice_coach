import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

const CreateUserDialog = ({ onUserCreated }: { onUserCreated: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newCredentials, setNewCredentials] = useState<{ email: string; password: string } | null>(null);
  const { toast } = useToast();

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const handleCreateUser = async () => {
    if (!email) {
      toast({
        title: 'Email is required',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    const password = generatePassword();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast({
        title: 'Error creating user',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setNewCredentials({ email, password });
      onUserCreated(); // Refresh the user list in the dashboard
    }

    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
    });
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setNewCredentials(null);
    setEmail('');
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{newCredentials ? 'User Created Successfully' : 'Create New User'}</DialogTitle>
          <DialogDescription>
            {newCredentials
              ? 'Copy the credentials below. The password will not be shown again.'
              : 'Enter the email address for the new user. A random password will be generated.'}
          </DialogDescription>
        </DialogHeader>

        {newCredentials ? (
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <div className="flex items-center gap-2">
                <Input value={newCredentials.email} readOnly />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(newCredentials.email)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label>Password</Label>
              <div className="flex items-center gap-2">
                <Input value={newCredentials.password} readOnly />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard(newCredentials.password)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
        )}

        <DialogFooter>
          {newCredentials ? (
            <Button onClick={resetAndClose}>Close</Button>
          ) : (
            <Button onClick={handleCreateUser} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create User'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
