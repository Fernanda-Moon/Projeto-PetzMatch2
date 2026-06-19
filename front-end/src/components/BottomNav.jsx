import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const navItems = [
    { path: '/home', icon: 'home', label: 'Início' },
    { path: '/explorar', icon: 'favorite', label: 'Explorar' },
    { path: '/chat', icon: 'chat_bubble', label: 'Chat' },
    { path: '/perfil', icon: 'person', label: 'Perfil' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="material-icons">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}