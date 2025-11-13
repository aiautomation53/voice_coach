import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: userRoles, error } = await supabase
        .from('user_roles')
        .select('roles(name)')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user roles:', error);
        navigate('/dashboard'); // Redirect to a general dashboard if roles cannot be fetched
        return;
      }

      const isAdminUser = userRoles.some((userRole: any) => userRole.roles.name === 'admin');
      if (isAdminUser) {
        setIsAdmin(true);
      } else {
        navigate('/dashboard'); // Redirect non-admins
      }
      setLoading(false);
    };

    checkUserRole();
  }, [navigate]);

  if (loading) {
    return <div>Loading user permissions...</div>;
  }

  return isAdmin ? <>{children}</> : null;
};

export default AdminRoute;
