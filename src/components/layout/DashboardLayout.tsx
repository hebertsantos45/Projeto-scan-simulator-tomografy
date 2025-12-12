import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Activity, 
  BookOpen, 
  Settings, 
  LogOut, 
  User, 
  GraduationCap,
  Users,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const studentLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Activity, label: 'Simulador', path: '/simulator' },
    { icon: BookOpen, label: 'Biblioteca', path: '/library' },
    { icon: GraduationCap, label: 'Minhas Notas', path: '/grades' },
  ];

  const adminLinks = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/admin' },
    { icon: Users, label: 'Alunos', path: '/admin/students' },
    { icon: CreditCard, label: 'Financeiro', path: '/admin/finance' },
    { icon: Settings, label: 'Configurações', path: '/admin/settings' },
  ];

  const links = user.role === 'admin' ? adminLinks : studentLinks;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Activity className="w-8 h-8" />
            CT Sim Pro
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Simulação Avançada de TC</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => (
            <Button
              key={link.path}
              variant={location.pathname === link.path ? "secondary" : "ghost"}
              className={cn("w-full justify-start gap-3", location.pathname === link.path && "bg-secondary/50")}
              onClick={() => navigate(link.path)}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t bg-muted/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
               {user.avatar ? <img src={user.avatar} alt="avatar" /> : <User className="w-5 h-5" />}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-card/50 backdrop-blur md:hidden">
           <span className="font-bold">CT Sim Pro</span>
           <Button size="sm" variant="ghost" onClick={handleLogout}><LogOut className="w-4 h-4" /></Button>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
