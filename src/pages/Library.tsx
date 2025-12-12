import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FileText, Video, Book } from 'lucide-react';

export default function Library() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Biblioteca Digital</h1>
          <p className="text-muted-foreground">Manuais, protocolos e aulas gravadas.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <Input placeholder="Buscar material..." className="w-full md:w-[300px]" />
          <Button size="icon"><Search className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Manuals Section */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300">
                <Book className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-500 uppercase">Manual</span>
            </div>
            <CardTitle>Siemens Somatom Force</CardTitle>
            <CardDescription>Guia completo de operação e protocolos.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">PDF • 12.5 MB</p>
          </CardContent>
        </Card>

        {/* Video Class */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg text-red-600 dark:text-red-300">
                <Video className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-red-500 uppercase">Aula</span>
            </div>
            <CardTitle>Física da Tomografia</CardTitle>
            <CardDescription>Princípios básicos de formação de imagem.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Vídeo • 45 min</p>
          </CardContent>
        </Card>

        {/* Protocol */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg text-green-600 dark:text-green-300">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-green-500 uppercase">Protocolo</span>
            </div>
            <CardTitle>Angio TC de Aorta</CardTitle>
            <CardDescription>Passo a passo para aquisição e contraste.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">PDF • 2.1 MB</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
