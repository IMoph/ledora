
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Layout, 
  Menu, 
  X, 
  Settings, 
  Info, 
  LayoutPanelLeft 
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  onPanelsClick: () => void;
  onTutorialClick: () => void;
}

const Sidebar = ({ onPanelsClick, onTutorialClick }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setCollapsed(!collapsed);
  
  const sidebarWidth = collapsed ? "w-16" : "w-64";
  const logoDisplay = collapsed ? "hidden" : "block";
  const textDisplay = collapsed ? "hidden" : "flex";
  
  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={toggleSidebar} 
          size="icon" 
          className="rounded-full shadow-lg bg-primary hover:bg-primary/80 h-14 w-14"
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
        
        {!collapsed && (
          <div className="fixed bottom-24 right-4 flex flex-col gap-2 animate-fade-in">
            <Button 
              onClick={onPanelsClick}
              variant="outline" 
              className="bg-white shadow-lg rounded-full flex gap-2 items-center"
            >
              <LayoutPanelLeft size={18} />
              Painéis
            </Button>
            <Button 
              onClick={onTutorialClick}
              variant="outline" 
              className="bg-white shadow-lg rounded-full flex gap-2 items-center"
            >
              <Info size={18} />
              Tutorial
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <aside 
      className={`${sidebarWidth} fixed left-0 top-0 h-full bg-white shadow-md transition-all duration-300 z-40`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className={`${logoDisplay} font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400`}>
            LED Calc
          </h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {collapsed ? <Menu /> : <X />}
          </Button>
        </div>
        
        <div className="p-2 flex-1">
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className={`w-full justify-${collapsed ? 'center' : 'start'}`}
            >
              <Calculator className="mr-2" />
              <span className={textDisplay}>Calculadora</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-${collapsed ? 'center' : 'start'}`}
              onClick={onPanelsClick}
            >
              <LayoutPanelLeft className="mr-2" />
              <span className={textDisplay}>Painéis</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-${collapsed ? 'center' : 'start'}`}
              onClick={onTutorialClick}
            >
              <Info className="mr-2" />
              <span className={textDisplay}>Tutorial</span>
            </Button>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className={`w-full justify-${collapsed ? 'center' : 'start'}`}
          >
            <Settings className="mr-2" />
            <span className={textDisplay}>Configurações</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
