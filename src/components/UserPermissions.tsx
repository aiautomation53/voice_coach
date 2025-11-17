import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface UserPermissionsProps {
  user: any;
  allAgents: any[];
}

const UserPermissions: React.FC<UserPermissionsProps> = ({ user, allAgents }) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPermissions = async () => {
      const { data, error } = await supabase
        .from('user_product_permissions')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) {
        console.error(`Error fetching permissions for user ${user.id}:`, error.message);
      } else {
        setPermissions(data.map(p => p.product_id));
      }
      setIsLoading(false);
    };

    fetchPermissions();
  }, [user.id]);

  const handlePermissionChange = (productId: string, checked: boolean) => {
    if (checked) {
      setPermissions(prev => [...prev, productId]);
    } else {
      setPermissions(prev => prev.filter(id => id !== productId));
    }
  };

  const handleSave = async () => {
    // First, delete all existing permissions for the user
    const { error: deleteError } = await supabase
      .from('user_product_permissions')
      .delete()
      .eq('user_id', user.id);

    if (deleteError) {
      toast({
        title: "Error updating permissions",
        description: deleteError.message,
        variant: "destructive",
      });
      return;
    }

    // Then, insert the new permissions
    const newPermissions = permissions.map(productId => ({
      user_id: user.id,
      product_id: productId,
    }));

    if (newPermissions.length > 0) {
      const { error: insertError } = await supabase
        .from('user_product_permissions')
        .insert(newPermissions);

      if (insertError) {
        toast({
          title: "Error updating permissions",
          description: insertError.message,
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "Permissions updated",
      description: `Permissions for ${user.email} have been updated successfully.`,
    });
  };

  if (isLoading) {
    return <div className="p-3 text-sm text-muted-foreground">Loading permissions...</div>;
  }

  return (
    <div className="p-3 bg-secondary/50 rounded-lg border border-card-border">
      <p className="text-sm font-medium text-primary mb-2">{user.email}</p>
      <div className="space-y-2">
        {allAgents.map(agent => (
          <div key={agent.id} className="flex items-center space-x-2">
            <Checkbox
              id={`${user.id}-${agent.id}`}
              checked={permissions.includes(agent.productId)}
              onCheckedChange={(checked) => handlePermissionChange(agent.productId, checked === true)}
            />
            <Label htmlFor={`${user.id}-${agent.id}`} className="text-sm text-muted-foreground">
              {agent.title}
            </Label>
          </div>
        ))}
      </div>
      <Button onClick={handleSave} size="sm" className="mt-4">
        Save Permissions
      </Button>
    </div>
  );
};

export default UserPermissions;
