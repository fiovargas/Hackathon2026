import React, { useState } from 'react';
import {
    Box, Drawer, AppBar, Toolbar, Typography, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Divider, Avatar, Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AdminCompanies from '../../components/Admin/AdminCompanies';
import VacanciesList from '../../components/Admin/VacanciesList';
import AdminRecentChanges from '../../components/Admin/AdminRecentChanges';
import AdminHome from '../../components/Admin/AdminHome';
import AdminSettings from '../../components/Admin/AdminSettings';
import AdminModerators from '../../components/Admin/AdminModerators';

const drawerWidth = 280;

const SidebarLink = ({ icon, label, active, onClick }) => {
    const theme = useTheme();
    return (
        <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
                onClick={onClick}
                sx={{
                    borderRadius: 2,
                    mx: 2,
                    py: 1.5,
                    backgroundColor: active ? 'primary.main' : 'transparent',
                    color: active ? 'primary.contrastText' : 'text.secondary',
                    '&:hover': {
                        backgroundColor: active ? 'primary.main' : theme.palette.action.hover,
                        color: active ? 'primary.contrastText' : 'text.primary',
                    },
                    transition: 'all 0.2s',
                    ...(active && {
                        boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                    }),
                }}
            >
                <ListItemIcon sx={{
                    minWidth: 40,
                    color: active ? 'inherit' : 'inherit'
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24, fontWeight: active ? 700 : 400 }}>
                        {icon}
                    </span>
                </ListItemIcon>
                <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                        fontWeight: active ? 700 : 500,
                        fontSize: '0.875rem'
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
};

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Sidebar Navigation */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper'
                    },
                }}
            >
                {/* Brand / Logo */}
                <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5, color: 'primary.main', mb: 2 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 32 }}>shield_person</span>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.025em' }}>
                        Admin Panel
                    </Typography>
                </Box>

                {/* Navigation Links */}
                <Box sx={{ overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <List subheader={
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', px: 4, py: 1, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Menú Principal
                        </Typography>
                    }>
                        <SidebarLink icon="dashboard" label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                        <SidebarLink icon="domain" label="Empresas" active={activeTab === 'empresas'} onClick={() => setActiveTab('empresas')} />
                        <SidebarLink icon="work" label="Vacantes" active={activeTab === 'vacantes'} onClick={() => setActiveTab('vacantes')} />
                        <SidebarLink icon="history" label="Cambios Recientes" active={activeTab === 'cambios-recientes'} onClick={() => setActiveTab('cambios-recientes')} />
                    </List>

                    <Divider sx={{ my: 1, mx: 3 }} />

                    <List subheader={
                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', px: 4, py: 1, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Sistema
                        </Typography>
                    }>
                        <SidebarLink icon="admin_panel_settings" label="Moderadores" active={activeTab === 'moderadores'} onClick={() => setActiveTab('moderadores')} />
                        <SidebarLink icon="settings" label="Configuración" active={activeTab === 'configuracion'} onClick={() => setActiveTab('configuracion')} />
                    </List>

                    {/* User Profile & Logout */}
                    <Box sx={{ mt: 'auto', p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Avatar
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-QzKLoDOYm9taP_XE3FNvmWOupe6AJSbkbPn7qaKAmvpd3s-g0GgRcdaNQB9l86xVAVobMYIAFCRLRXFHu1k1VN8QCQ5lGxK0r5RhpItjmxAqnrqnUTLfEkEL_bFm_-bC-kjAScHUfILcvOM5NN7xDluRZUpR4dXAzvx51z-cpQmDpk4VZf4TsVAW4uoBMt9YvuzZBZJlNo_-FMRcNbVmm1Vljsx2nkk0zDlL9vxlhSzoDxsNkb1eJG3fgTie72FLUw75Qn0Epnk"
                                sx={{ width: 48, height: 48, bgcolor: 'primary.light', border: '2px solid', borderColor: 'primary.main' }}
                            />
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                                    Super Admin
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                    Admin Principal
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            fullWidth
                            variant="outlined"
                            color="inherit"
                            onClick={() => window.location.href = '/'}
                            sx={{
                                py: 1.5,
                                borderRadius: 3,
                                color: 'text.secondary',
                                borderColor: 'divider',
                                '&:hover': {
                                    bgcolor: 'error.light',
                                    color: 'error.main',
                                    borderColor: 'error.main'
                                }
                            }}
                            startIcon={<span className="material-symbols-outlined">logout</span>}
                        >
                            Cerrar Sesión
                        </Button>
                    </Box>
                </Box>
            </Drawer>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Header Nav */}
                <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', height: 80, justifyContent: 'center' }}>
                    <Toolbar sx={{ px: 4 }}>
                        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 800, textTransform: 'capitalize' }}>
                            {activeTab}
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Content scrollable area */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 4 }}>
                    {activeTab === 'dashboard' && (
                        <Box sx={{ maxWidth: 'xl', mx: 'auto', width: '100%', animation: 'fadeIn 0.5s ease-in-out' }}>
                            <AdminHome />
                        </Box>
                    )}

                    {activeTab === 'empresas' && (
                        <Box sx={{ maxWidth: 'xl', mx: 'auto', width: '100%', animation: 'fadeIn 0.5s ease-in-out' }}>
                            <AdminCompanies />
                        </Box>
                    )}

                    {activeTab === 'vacantes' && (
                        <Box sx={{ maxWidth: 'xl', mx: 'auto', width: '100%', animation: 'fadeIn 0.5s ease-in-out' }}>
                            <VacanciesList />
                        </Box>
                    )}

                    {activeTab === 'cambios-recientes' && (
                        <Box sx={{ maxWidth: 'xl', mx: 'auto', width: '100%', animation: 'fadeIn 0.5s ease-in-out' }}>
                            <AdminRecentChanges />
                        </Box>
                    )}

                    {activeTab === 'moderadores' && (
                        <Box sx={{ maxWidth: 'xl', mx: 'auto', width: '100%', animation: 'fadeIn 0.5s ease-in-out' }}>
                            <AdminModerators />
                        </Box>
                    )}

                    {activeTab === 'configuracion' && (
                        <Box sx={{ maxWidth: 'xl', mx: 'auto', width: '100%', animation: 'fadeIn 0.5s ease-in-out' }}>
                            <AdminSettings />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
