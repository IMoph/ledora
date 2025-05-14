import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

export function IOSInstallPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user is on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    // Check if app is not in standalone mode (not installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    
    // Check if the user has seen the popup before
    const hasSeenPopup = localStorage.getItem('ios-pwa-popup-seen') === 'true';
    
    // Only show popup if all conditions are met
    if (isIOS && !isStandalone && !hasSeenPopup) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    // Mark that the user has seen the popup
    localStorage.setItem('ios-pwa-popup-seen', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-white p-6 rounded-lg max-w-md mx-auto">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </Button>
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Instale o CalcuLEDora</DialogTitle>
        </DialogHeader>
        
        <div className="my-4 space-y-4">
          <DialogDescription className="text-center">
            Instale nosso app para um melhor desempenho e acesso offline!
          </DialogDescription>
          
          <div className="space-y-2">
            <p className="text-sm">Para instalar:</p>
            <ol className="list-decimal pl-5 text-sm space-y-2">
              <li>Toque no ícone <span className="inline-block px-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span> ou <span className="inline-block px-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H8.01M12 12H12.01M16 12H16.01M5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span> no Safari</li>
              <li>Clique em "Adicionar à Tela de Início"</li>
              <li>Toque em "Adicionar"</li>
            </ol>
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            variant="outline"
            onClick={handleClose}
            className="w-full"
          >
            Lembrar depois
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
