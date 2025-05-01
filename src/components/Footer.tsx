
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-8 pt-6 border-t border-white/10 text-white/80">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <a href="mailto:calculedora@gmail.com" className="hover:text-white transition-colors">
            calculedora@gmail.com
          </a>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>© {new Date().getFullYear()} calcuLEDora</span>
          <div className="flex items-center gap-1">
            <span>Doações PIX:</span>
            <span className="font-medium">calculedora@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
