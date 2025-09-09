import { Drawer, Divider, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import './Sidebar.css';

/**
 * 
 * @param {boolean} isOpen -- Booleano para controlar si el sidebar está abierto o cerrado.
 * @param {function} toggleSidebar -- Función para alternar el estado del sidebar.
 * @param {Array} itemLists -- Lista de elementos a mostrar en el sidebar.
 * @param {string} position -- Posición del sidebar ('left', 'right', 'top', 'bottom').
 * @param {string} title -- Título opcional para el sidebar. 
 * @returns 
 */
const Sidebar = ({ isOpen, toggleSidebar, itemLists, position, title }) => {
    return (
        <Drawer anchor={position} open={isOpen} onClose={toggleSidebar} sx={{ '& .MuiDrawer-paper': { width: 350 } }}>
            {title && (
                <>
                    <DrawerHeader title={title} onClose={toggleSidebar} />
                    <Divider variant='middle' />
                </>
            )}
            <List>
                {itemLists.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemButton>
                            <ListItemText primary={item}  sx={{

                                '& .MuiTypography-root': { color: 'var(--blue-secondary)' },
                                '& a': { textDecoration: 'none', color: 'var(--blue-secondary)', fontSize: '1.2rem', fontWeight: '500', textTransform: 'uppercase'}
                            }}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;

const DrawerHeader = ({ title, onClose }) => (
    <div className="drawer-header">
        <h2>{title}</h2>
        <IconButton onClick={onClose}>
            <Close />
        </IconButton>
    </div>
);