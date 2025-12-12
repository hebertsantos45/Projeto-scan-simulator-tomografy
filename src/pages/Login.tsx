import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, ShieldCheck, GraduationCap, Stethoscope } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (role: string) => {
    setIsLoading(true);
    setTimeout(() => {
      login(role);
      setIsLoading(false);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md border-slate-700 bg-slate-900/90 text-slate-100 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 text-primary">
            <Activity className="w-10 h-10" />
          </div>
          <CardTitle className="text-3xl font-bold">CT Sim Pro</CardTitle>
          <CardDescription className="text-slate-400">
            Sistema Avançado de Simulação de Tomografia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="student">Aluno</TabsTrigger>
              <TabsTrigger value="professor">Prof.</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Institucional</Label>
                <Input id="email" placeholder="usuario@instituicao.com" className="bg-slate-800 border-slate-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" className="bg-slate-800 border-slate-700" />
              </div>
            </div>

            <TabsContent value="student" className="mt-6">
              <Button className="w-full h-12 text-lg" onClick={() => handleLogin('student')} disabled={isLoading}>
                <GraduationCap className="mr-2 h-5 w-5" />
                {isLoading ? 'Entrando...' : 'Acessar como Aluno'}
              </Button>
            </TabsContent>
            
            <TabsContent value="professor" className="mt-6">
              <Button className="w-full h-12 text-lg" variant="secondary" onClick={() => handleLogin('professor')} disabled={isLoading}>
                <Stethoscope className="mr-2 h-5 w-5" />
                {isLoading ? 'Entrando...' : 'Acessar como Professor'}
              </Button>
            </TabsContent>

            <TabsContent value="admin" className="mt-6">
              <Button className="w-full h-12 text-lg" variant="destructive" onClick={() => handleLogin('admin')} disabled={isLoading}>
                <ShieldCheck className="mr-2 h-5 w-5" />
                {isLoading ? 'Entrando...' : 'Acessar Administrativo'}
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-xs text-slate-500">
            <p>Ambiente seguro e monitorado.</p>
            <p>Versão 2.4.0 - Build 2025</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
