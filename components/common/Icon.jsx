import { 
  Menu, X, ExternalLink, Github, Linkedin, Mail, 
  ArrowRight, Download, Building, Briefcase, 
  TrendingUp, Code2, Send, Cloud,CheckCircle
} from 'lucide-react';

const ICON_MAP = {
  Menu, X, ExternalLink, Github, Linkedin, Mail,
  ArrowRight, Download, Building, Briefcase,
  TrendingUp, Code2, Send, Cloud,CheckCircle
};

export const Icon = ({ name, size = 20, className = "" }) => {
  const Component = ICON_MAP[name];
  if (!Component) {
    console.warn(`Icon "${name}" not found`);
    return <div style={{ width: size, height: size }} className={className} />;
  }
  return <Component size={size} className={className} />;
};