import React, { useState, useEffect } from 'react';
import './ContextMenu.css';
import { fetchNui } from '../../utils/fetchNui';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);


export interface MenuItem {
  header: string;
  txt?: string;
  icon?: string;
  isMenuHeader?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  params?: {
    event: string | ((args: any) => void);
    args?: any;
    isServer?: boolean;
    isCommand?: boolean;
    isAction?: boolean;
  };
}

const ContextMenu: React.FC = () => {

  const [visible, setVisible] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);


  const handleMenuItemClick = (item: MenuItem) => {
    if (item.isMenuHeader || item.disabled) return;
    

    fetchNui('menuItemSelected', item);
    

    setVisible(false);
  };


  const handleClose = () => {
    fetchNui('closeMenu', {});
    setVisible(false);
  };


  useNuiEvent<MenuItem[]>('openMenu', (items) => {

    setMenuItems(items.filter(item => !item.hidden));
    setVisible(true);
  });


  useNuiEvent<any>('closeMenu', () => {

    setVisible(false);
  });
  

  useNuiEvent<boolean>('setVisible', (isVisible) => {


    if (!isVisible) {
      setVisible(false);
    }
  });


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);



  return (
    <div className="context-menu-container" style={{display: visible ? 'flex' : 'none'}}>
      
      <div className="context-menu">
        {menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <div 
              key={index}
              className={`menu-item ${item.isMenuHeader ? 'menu-header' : ''} ${item.disabled ? 'disabled' : ''}`}
              onClick={() => !item.isMenuHeader && !item.disabled && handleMenuItemClick(item)}
            >
              <div className="item-header">
                {item.icon && <span className="item-icon"><i className={item.icon}></i></span>}
                <span className="item-title">{item.header}</span>
              </div>
              {item.txt && <div className="item-description">{item.txt}</div>}
            </div>
          ))
        ) : (
          <div className="menu-item menu-header">没有菜单项</div>
        )}
      </div>
    </div>
  );
};

export default ContextMenu;
