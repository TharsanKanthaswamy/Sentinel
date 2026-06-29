import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileSearch } from 'lucide-react';

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/cases', icon: FileSearch, label: 'Cases' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>Sentinel AI</span>
      </div>

      <nav className="sidebar-nav">
        {nav.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-status">
          <span className="dot" />
          System Online
        </div>
      </div>
    </aside>
  );
}
