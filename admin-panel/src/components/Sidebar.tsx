import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const linkBaseStyle: React.CSSProperties = {
  display: 'block',
  padding: '0.75rem 1rem',
  borderRadius: '0.375rem',
  color: '#374151',
  textDecoration: 'none',
  fontSize: '0.95rem'
};

const activeLinkStyle: React.CSSProperties = {
  backgroundColor: '#e5e7eb',
  color: '#111827'
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const containerStyle: React.CSSProperties = {
    width: isCollapsed ? '80px' : '260px',
    backgroundColor: 'white',
    borderRight: '1px solid #e5e7eb',
    padding: isCollapsed ? '0.75rem' : '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'width 0.2s ease, padding 0.2s ease'
  };

  const headerStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
    color: 'white',
    borderRadius: '0.5rem',
    padding: isCollapsed ? '0.75rem' : '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'space-between',
    boxShadow: '0 6px 16px rgba(59,130,246,0.25)'
  };

  const brandStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const toggleBtnStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.15)',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    padding: '0.35rem 0.5rem',
    cursor: 'pointer'
  };

  const navItemStyle = (active: boolean): React.CSSProperties => ({
    ...linkBaseStyle,
    ...(active ? activeLinkStyle : {}),
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    position: 'relative',
    transition: 'background-color 0.15s ease, color 0.15s ease'
  });

  const iconStyle: React.CSSProperties = {
    width: '22px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9
  };

  const labelStyle: React.CSSProperties = {
    display: isCollapsed ? 'none' : 'inline'
  };

  const sectionLabelStyle: React.CSSProperties = {
    color: '#9ca3af',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    padding: '0 0.5rem'
  };

  return (
    <aside style={containerStyle}>
      <div style={headerStyle}>
        <div style={brandStyle}>
          <span style={{ fontWeight: 700 }}>⚙️</span>
          {!isCollapsed && (
            <div>
              <div style={{ fontWeight: 700, lineHeight: 1 }}>Admin Panel</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.4 }}>Management</div>
            </div>
          )}
        </div>
        <button
          aria-label="Toggle sidebar"
          onClick={() => setIsCollapsed((v) => !v)}
          style={toggleBtnStyle}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '›' : '‹'}
        </button>
      </div>

      {!isCollapsed && <div style={sectionLabelStyle}>Overview</div>}
      <nav style={{ display: 'grid', gap: '0.25rem' }}>
        <NavLink to="/dashboard" title="Dashboard" style={({ isActive }) => navItemStyle(isActive)}>
          <span style={iconStyle}>🏠</span>
          <span style={labelStyle}>Dashboard</span>
          {/* active indicator */}
        </NavLink>
        <NavLink to="/blog" title="Blog" style={({ isActive }) => navItemStyle(isActive)}>
          <span style={iconStyle}>📝</span>
          <span style={labelStyle}>Blog Management</span>
        </NavLink>
        <NavLink to="/projects" title="Projects" style={({ isActive }) => navItemStyle(isActive)}>
          <span style={iconStyle}>📁</span>
          <span style={labelStyle}>Projects</span>
        </NavLink>
        <NavLink to="/contacts" title="Contacts" style={({ isActive }) => navItemStyle(isActive)}>
          <span style={iconStyle}>👥</span>
          <span style={labelStyle}>Contacts</span>
        </NavLink>
        {!isCollapsed && <div style={{ height: '0', borderTop: '1px solid #f1f5f9', margin: '0.5rem 0' }} />}
        <NavLink to="/settings" title="Settings" style={({ isActive }) => navItemStyle(isActive)}>
          <span style={iconStyle}>⚙️</span>
          <span style={labelStyle}>Settings</span>
        </NavLink>
      </nav>

      {!isCollapsed && (
        <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: '#9ca3af', padding: '0.25rem 0.5rem' }}>
          v1.0.0
        </div>
      )}
    </aside>
  );
};

export default Sidebar;


