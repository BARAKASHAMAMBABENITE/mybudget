import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  FileText, 
  Bell, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/revenus', name: 'Revenus', icon: <TrendingUp size={20} /> },
    { path: '/depenses', name: 'Dépenses', icon: <TrendingDown size={20} /> },
    { path: '/statistiques', name: 'Statistiques', icon: <BarChart3 size={20} /> },
    { path: '/objectifs', name: 'Objectifs d’épargne', icon: <Target size={20} /> },
    { path: '/rapports', name: 'Rapports', icon: <FileText size={20} /> },
  ];

  return (
    <>
      {/* Bouton Toggle pour Mobile */}
      <button 
        className="sidebar-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay pour fermer la sidebar sur mobile en cliquant à côté */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}

      <aside className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">MB</div>
          <span className="logo-text">MyBudget</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="link-icon">{item.icon}</span>
              <span className="link-text">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;