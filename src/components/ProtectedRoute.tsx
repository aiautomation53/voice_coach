import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  agentTitle: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, agentTitle }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      // Fetch productId from agentTitle
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('id')
        .eq('name', agentTitle)
        .single();

      if (productError || !product) {
        console.error(`Error fetching product ID for ${agentTitle}:`, productError?.message);
        navigate('/dashboard'); // Redirect if product not found
        return;
      }
      const productId = product.id;

      // Check if user is admin
      const { data: userRoles, error: roleError } = await supabase
        .from('user_roles')
        .select('roles(name)')
        .eq('user_id', user.id);

      if (roleError) {
        console.error("Error fetching user roles:", roleError.message);
        navigate('/dashboard'); // Redirect on error
        return;
      }

      const isAdmin = userRoles.some((r: any) => r.roles && r.roles.name === 'admin');
      if (isAdmin) {
        setIsAuthorized(true);
        setLoading(false);
        return;
      }

      // If not admin, check for product permission
      const { data: permissions, error: permissionsError } = await supabase
        .from('user_product_permissions')
        .select('product_id')
        .eq('user_id', user.id);

      if (permissionsError) {
        console.error("Error fetching user permissions:", permissionsError.message);
        navigate('/dashboard'); // Redirect on error
        return;
      }

      const allowedProductIds = new Set(permissions.map(p => p.product_id));
      if (allowedProductIds.has(productId)) {
        setIsAuthorized(true);
      } else {
        navigate('/dashboard'); // Redirect if no permission
      }
      setLoading(false);
    };

    checkAuthorization();

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [navigate, agentTitle]);

  if (loading) {
    return <div>Loading authorization...</div>; // Or a spinner
  }

  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedRoute;