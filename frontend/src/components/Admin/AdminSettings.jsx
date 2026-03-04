import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Divider, Switch,
    FormControlLabel, TextField, Button, Grid, Avatar,
    Select, MenuItem, InputLabel, FormControl, Alert
} from '@mui/material';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, label: 'Perfil & Seguridad', icon: 'shield_person' },
        { id: 1, label: 'Moderadores', icon: 'admin_panel_settings' },
        { id: 2, label: 'Ajustes Globales', icon: 'tune' }
    ];

    return (
        <Box sx={{ width: '100%', pb: 6 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, letterSpacing: '-0.025em' }}>
                    Configuración
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                    Administra tus preferencias, accesos del equipo y reglas del sistema.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Menú de Pestañas (Vertical Style) */}
                <Grid item xs={12} md={3}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {tabs.map((tab) => (
                                <Box
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    sx={{
                                        p: 2.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        cursor: 'pointer',
                                        borderLeft: '4px solid',
                                        borderColor: activeTab === tab.id ? 'primary.main' : 'transparent',
                                        bgcolor: activeTab === tab.id ? 'primary.50' : 'transparent',
                                        color: activeTab === tab.id ? 'primary.main' : 'text.secondary',
                                        '&:hover': {
                                            bgcolor: activeTab === tab.id ? 'primary.50' : 'action.hover'
                                        },
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <span className="material-symbols-outlined">{tab.icon}</span>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                        {tab.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Grid>

                {/* Contenido de las Pestañas */}
                <Grid item xs={12} md={9}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>

                            {/* TAB 0: Perfil y Seguridad */}
                            {activeTab === 0 && (
                                <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Perfil del Super Administrador</Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                                        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem' }}>A</Avatar>
                                        <Box>
                                            <Button variant="outlined" size="small" sx={{ mb: 1, borderRadius: 2 }}>Cambiar Foto</Button>
                                            <Typography variant="caption" display="block" color="text.secondary">JPG, GIF o PNG. Max 1MB.</Typography>
                                        </Box>
                                    </Box>

                                    <Grid container spacing={3} sx={{ mb: 4 }}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Nombre Completo" defaultValue="Admin Principal" variant="outlined" size="small" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Correo Electrónico" defaultValue="admin@seniors.com" variant="outlined" size="small" />
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 4 }} />

                                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Seguridad de la Cuenta</Typography>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Cambiar Contraseña</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={4}>
                                                <TextField fullWidth type="password" label="Contraseña Actual" size="small" />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <TextField fullWidth type="password" label="Nueva Contraseña" size="small" />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <Button variant="contained" color="primary" fullWidth sx={{ height: '100%', boxShadow: 'none' }}>Actualizar</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>Autenticación de Dos Pasos (2FA)</Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Requiere un código de Google Authenticator al iniciar sesión.</Typography>
                                        </Box>
                                        <Switch color="primary" defaultChecked />
                                    </Box>
                                </Box>
                            )}

                            {/* TAB 1: Moderadores */}
                            {activeTab === 1 && (
                                <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 800 }}>Gestión de Equipo</Typography>
                                        <Button variant="contained" color="secondary" startIcon={<span className="material-symbols-outlined">person_add</span>} sx={{ boxShadow: 'none' }}>
                                            Invitar Miembro
                                        </Button>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>Crea y gestiona cuentas con acceso al panel de administración para tus moderadores.</Typography>

                                    {/* Lista de Moderadores Placeholder */}
                                    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
                                        {[1, 2].map((item, index) => (
                                            <Box key={item} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: index === 0 ? '1px solid' : 'none', borderColor: 'divider' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: index === 0 ? 'secondary.main' : 'primary.main' }}>
                                                        {index === 0 ? 'C' : 'M'}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{index === 0 ? 'Carlos Soporte' : 'María Moderadora'}</Typography>
                                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{index === 0 ? 'carlos@seniors.com' : 'maria@seniors.com'}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Chip label={index === 0 ? "Soporte" : "Moderador"} size="small" sx={{ fontWeight: 700, bgcolor: 'slate.100' }} />
                                                    <Button size="small" color="error" variant="text">Revocar</Button>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            {/* TAB 2: Ajustes Globales */}
                            {activeTab === 2 && (
                                <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Reglas de Plataforma</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>Modifica el comportamiento y las reglas automáticas del sistema.</Typography>

                                    <Grid container spacing={3} sx={{ mb: 4 }}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Aprobación de Empresas</InputLabel>
                                                <Select label="Aprobación de Empresas" defaultValue="manual">
                                                    <MenuItem value="manual">Revisión Manual (Recomendado)</MenuItem>
                                                    <MenuItem value="auto">Automática</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Duración por defecto de Vacantes</InputLabel>
                                                <Select label="Duración por defecto de Vacantes" defaultValue="30">
                                                    <MenuItem value="15">15 Días</MenuItem>
                                                    <MenuItem value="30">30 Días</MenuItem>
                                                    <MenuItem value="60">60 Días</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
                                        <FormControlLabel control={<Switch defaultChecked color="primary" />} label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Notificarme de nuevos registros de empresas por email</Typography>} />
                                        <FormControlLabel control={<Switch defaultChecked color="primary" />} label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Filtro automático de palabras altisonantes en Vacantes</Typography>} />
                                    </Box>

                                    <Divider sx={{ my: 4 }} />

                                    {/* Danger Zone */}
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'error.main', mb: 2 }}>Zona de Peligro</Typography>
                                    <Alert severity="error" icon={<span className="material-symbols-outlined">warning</span>} sx={{ borderRadius: 2, mb: 3 }}>
                                        Las acciones en esta área afectan directamente a la disponibilidad de la plataforma en producción.
                                    </Alert>

                                    <Box sx={{ border: '1px solid', borderColor: 'error.light', borderRadius: 3, p: 3, bgcolor: '#fffafa' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>Modo Mantenimiento</Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Bloquea el acceso a todos los usuarios mostrando una página de mantenimiento.</Typography>
                                            </Box>
                                            <Button variant="outlined" color="error" sx={{ bgcolor: '#fff' }}>Activar Modo</Button>
                                        </Box>
                                        <Divider sx={{ my: 2, borderColor: 'error.100' }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>Limpiar Caché Global</Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Fuerza a todos los clientes a descargar la última versión de la app.</Typography>
                                            </Box>
                                            <Button variant="outlined" color="error" sx={{ bgcolor: '#fff' }}>Limpiar Caché</Button>
                                        </Box>
                                    </Box>

                                </Box>
                            )}

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminSettings;
