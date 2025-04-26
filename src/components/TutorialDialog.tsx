
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info, X } from "lucide-react";

interface TutorialDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TutorialDialog = ({ open, onOpenChange }: TutorialDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isControlled = open !== undefined && onOpenChange !== undefined;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };
  
  const currentOpen = isControlled ? open : isOpen;

  return (
    <Dialog open={currentOpen} onOpenChange={handleOpenChange}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-white/80 hover:bg-white flex gap-2">
            <Info size={18} />
            Tutorial
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Info className="text-primary" />
              Tutorial
            </DialogTitle>
            <button
              aria-label="Fechar"
              onClick={() => handleOpenChange(false)}
              className="rounded-full p-1 ml-2 transition-all border border-transparent hover:bg-red-100"
            >
              <X size={22} className="text-gray-500 hover:text-red-600" />
            </button>
          </div>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="text-lg font-medium mb-4">Como utilizar a calculadora</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">1. Cadastro de Painéis</h4>
                <p className="text-gray-600">
                  Primeiro, cadastre os modelos de painéis LED que você utiliza clicando no botão "Painéis". Preencha as informações como nome, valor de P, dimensões e resolução.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">2. Seleção de Modelo</h4>
                <p className="text-gray-600">
                  Na calculadora, selecione o modelo de painel que você deseja utilizar no projeto.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">3. Modos de Cálculo</h4>
                <p className="text-gray-600">
                  Escolha entre "Calcular por Dimensões" (informe largura e altura em metros) ou "Calcular por Quantidade" (informe a quantidade de painéis na largura e altura).
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">4. Resultados</h4>
                <p className="text-gray-600">
                  Após calcular, você verá informações como: quantidade de painéis necessários, resolução final, proporção, cabos de sinal necessários, dimensões finais e mais.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-primary/5 p-6 border border-primary/10">
            <h3 className="text-lg font-medium mb-4">Funcionalidades Adicionais</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex gap-2 items-start">
                <span className="text-primary font-bold">•</span>
                <span>Histórico de cálculos recentes para referência rápida.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary font-bold">•</span>
                <span>Cadastro de especificações como watts e peso para cálculos avançados.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary font-bold">•</span>
                <span>Funcionamento offline: utilize a calculadora mesmo sem conexão com internet.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary font-bold">•</span>
                <span>Cálculo automático de kVA e peso total quando disponíveis.</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialDialog;
