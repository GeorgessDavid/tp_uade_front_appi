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
 * @param {React.JSX.Element} bottom -- Elemento opcional para renderizar en la parte inferior del sidebar.
 * @returns 
 */
const Sidebar = ({ isOpen, toggleSidebar, itemLists, position, title, bottom }) => {
    return (
        <Drawer anchor={position} open={isOpen} onClose={toggleSidebar} sx={{ '& .MuiDrawer-paper': { width: 350 } }}>
            {title && (
                <>
                    <DrawerHeader title={title} onClose={toggleSidebar} />
                </>
            )}
            <List>
                {itemLists.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemButton>
                            <ListItemText primary={item} sx={{

                                '& .MuiTypography-root': { color: 'var(--blue-secondary)' },
                                '& a': { textDecoration: 'none', color: 'var(--blue-secondary)', fontSize: '1.2rem', fontWeight: '500', textTransform: 'uppercase' }
                            }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {bottom && <DrawerFooter>{bottom}</DrawerFooter>}
        </Drawer>
    );
}

export default Sidebar;

const DrawerHeader = ({ title, onClose }) => (
    <>
        <div className="drawer-header">
            <h2>{title}</h2>
            <IconButton onClick={onClose}>
                <Close />
            </IconButton>
        </div>
        <Divider variant='middle' />
    </>
);

const DrawerFooter = ({ children }) => {
    return (
        <>
            <Divider variant='middle' />
            <div className="drawer-footer">
                <List>
                    <ListItem>
                        <ListItemText primary={children} sx={{ '& a': { textDecoration: 'none', color: 'var(--blue-secondary)', fontSize: '1.2rem', fontWeight: '500', textTransform: 'uppercase' } }} />
                    </ListItem>
                </List>
            </div>
        </>
    )
}