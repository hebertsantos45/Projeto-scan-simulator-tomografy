import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, Clock, Award, PlayCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Olá, {user?.name}</h1>
          <p className="text-muted-foreground">Bem-vindo de volta ao seu centro de treinamento.</p>
        </div>
        <Button onClick={() => navigate('/simulator')} size="lg" className="gap-2 shadow-lg hover:shadow-primary/25">
          <PlayCircle className="w-5 h-5" />
          Novo Treinamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <Progress value={65} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">Módulo Intermediário</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Simulações</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 essa semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Técnica</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5</div>
            <p className="text-xs text-muted-foreground">Excelente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Ativo</div>
            <p className="text-xs text-muted-foreground">Plano Anual</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Histórico Recente</CardTitle>
            <CardDescription>Suas últimas 5 simulações.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exame</TableHead>
                  <TableHead>Equipamento</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Nota</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { exam: 'TC Crânio', machine: 'Siemens Force', date: 'Hoje', score: 9.0, status: 'Aprovado' },
                  { exam: 'TC Tórax', machine: 'GE Revolution', date: 'Ontem', score: 7.5, status: 'Aprovado' },
                  { exam: 'Angio TC', machine: 'Canon Aquilion', date: '12/05', score: 5.0, status: 'Revisar' },
                ].map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.exam}</TableCell>
                    <TableCell>{item.machine}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.score}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={item.score >= 7 ? 'default' : 'destructive'}>{item.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Notifications / Warnings */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Avisos</CardTitle>
            <CardDescription>Comunicados da coordenação.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
              <div>
                <p className="text-sm font-medium">Novo Protocolo Adicionado</p>
                <p className="text-xs text-muted-foreground">O protocolo de TAVI foi atualizado na biblioteca.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
              <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 shrink-0" />
              <div>
                <p className="text-sm font-medium">Manutenção Programada</p>
                <p className="text-xs text-muted-foreground">O simulador ficará instável domingo às 03:00.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
