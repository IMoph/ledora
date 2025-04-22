
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TutorialDialog = () => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="border border-primary bg-background hover:scale-110 transition-transform" title="Abrir tutorial">
          <HelpCircle size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Como utilizar a ferramenta?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2 text-[15px]">
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <span className="font-semibold">Clique no botão Painéis</span> preenchendo o campo &quot;Nome da Placa&quot; (exemplo: <span className="font-mono bg-muted px-1 rounded">Nome da Empresa</span>), largura e altura em milímetros, e resolução.
            </li>
            <li>
              <span className="font-semibold">Use os campos na tela inicial</span> para escolher o modelo de placa e informar as dimensões finais desejadas do painel ou o número de placas.
            </li>
            <li>
              <span className="font-semibold">Clique em &quot;Calcular&quot;</span> e veja o resultado em detalhes, incluindo distribuição dos cabos de sinal RJ45, Proporção de aspecto, quantidades de placas,...
            </li>
          </ol>
          <div className="pt-2 pb-1 border-t text-muted-foreground text-xs">Dúvidas? Consulte o suporte!</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialDialog;
