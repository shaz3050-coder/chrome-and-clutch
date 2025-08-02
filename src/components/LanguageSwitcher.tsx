import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState("TR");

  const languages = [
    { code: "TR", name: "Türkçe", flag: "🇹🇷" },
    { code: "EN", name: "English", flag: "🇺🇸" }
  ];

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    // In a real app, this would trigger language change logic
    console.log(`Language changed to: ${langCode}`);
    // You could store this in localStorage or context
    localStorage.setItem('language', langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center space-x-2 ${
              currentLanguage === lang.code ? 'bg-muted' : ''
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;