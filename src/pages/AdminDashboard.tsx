
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const { data: usersData, error: usersError } = await supabase.rpc('get_all_users');
      if (usersError) console.error('Error fetching users:', usersError);
      else setUsers(usersData);

      const { data: productsData, error: productsError } = await supabase.from('products').select('*');
      if (productsError) console.error('Error fetching products:', productsError);
      else setProducts(productsData);

      const { data: permissionsData, error: permissionsError } = await supabase.from('user_product_permissions').select('*');
      if (permissionsError) console.error('Error fetching permissions:', permissionsError);
      else {
        const perms = {};
        permissionsData.forEach((p: any) => {
          if (!perms[p.user_id]) perms[p.user_id] = {};
          perms[p.user_id][p.product_id] = true;
        });
        setPermissions(perms);
      }
    };
    fetchData();
  }, []);

  const handlePermissionChange = async (userId: string, productId: string, hasPermission: boolean) => {
    if (hasPermission) {
      const { error } = await supabase.from('user_product_permissions').insert([{ user_id: userId, product_id: productId }]);
      if (error) console.error('Error granting permission:', error);
    } else {
      const { error } = await supabase.from('user_product_permissions').delete().match({ user_id: userId, product_id: productId });
      if (error) console.error('Error revoking permission:', error);
    }
    // Optimistically update UI
    setPermissions(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [productId]: hasPermission
      }
    }));
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                {products.map(product => <TableHead key={product.id}>{product.name}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  {products.map(product => (
                    <TableCell key={product.id}>
                      <Checkbox
                        checked={permissions[user.id]?.[product.id] || false}
                        onCheckedChange={(checked) => handlePermissionChange(user.id, product.id, !!checked)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
