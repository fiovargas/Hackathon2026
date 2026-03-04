import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Chip, Avatar, Divider } from '@mui/material';

const AdminHome = () => {
    return (
        <Box sx={{ width: '100%', pb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, letterSpacing: '-0.025em' }}>
                    Dashboard
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                    Bienvenido de vuelta. Aquí tienes el panorama general del día.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Left Column: Quick Actions & Timeline */}
                <Grid item xs={12} lg={8}>

                    {/* Quick Actions */}
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                        Acciones Prioritarias
                    </Typography>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={6}>
                            <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'warning.light', bgcolor: '#fffdf5', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box sx={{ p: 1.5, bgcolor: 'warning.light', color: 'warning.main', borderRadius: 3 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>domain_add</span>
                                        </Box>
                                        <Chip label="Pendientes: 3" color="warning" size="small" sx={{ fontWeight: 700 }} />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>Nuevas Empresas</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                                        Hay 3 empresas esperando la aprobación de su perfil para empezar a publicar.
                                    </Typography>
                                    <Button variant="contained" color="warning" fullWidth sx={{ boxShadow: 'none', color: '#fff', py: 1.5, borderRadius: 2 }}
                                        startIcon={<span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>}>
                                        Revisar Solicitudes
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'error.light', bgcolor: '#fffafa', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box sx={{ p: 1.5, bgcolor: 'error.light', color: 'error.main', borderRadius: 3 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>report</span>
                                        </Box>
                                        <Chip label="Reportes: 2" color="error" size="small" sx={{ fontWeight: 700 }} />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>Vacantes Reportadas</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                                        Los usuarios han reportado 2 vacantes que infringen los términos de la plataforma.
                                    </Typography>
                                    <Button variant="contained" color="error" fullWidth sx={{ boxShadow: 'none', py: 1.5, borderRadius: 2 }}
                                        startIcon={<span className="material-symbols-outlined" style={{ fontSize: 20 }}>gavel</span>}>
                                        Moderar Vacantes
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Timeline Feed */}
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                        <CardContent sx={{ p: 0 }}>
                            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Actividad Reciente</Typography>
                                <Button size="small" variant="text" color="primary">Ver todo</Button>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                {/* Custom Timeline Item */}
                                <Box sx={{ display: 'flex', gap: 2, mb: 3, position: 'relative' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 40, height: 40 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>work</span>
                                        </Avatar>
                                        <Box sx={{ width: 2, bgcolor: 'divider', flexGrow: 1, my: 1, minHeight: 40 }} />
                                    </Box>
                                    <Box sx={{ pb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Innovateca</Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>publicó una vacante</Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.primary', mb: 1 }}>"Data Analyst SR"</Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span> Hace 5 minutos
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Custom Timeline Item */}
                                <Box sx={{ display: 'flex', gap: 2, mb: 3, position: 'relative' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main', width: 40, height: 40 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>how_to_reg</span>
                                        </Avatar>
                                        <Box sx={{ width: 2, bgcolor: 'divider', flexGrow: 1, my: 1, minHeight: 40 }} />
                                    </Box>
                                    <Box sx={{ pb: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Moderador (Tú)</Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>aprobó una empresa</Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.primary', mb: 1 }}>"Tech Solutions S.A."</Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span> Hace 1 hora
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Custom Timeline Item (Last) */}
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Avatar sx={{ bgcolor: 'success.light', color: 'success.main', width: 40, height: 40 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person_add</span>
                                        </Avatar>
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Nuevo Usuario Registrado</Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.primary', mb: 1 }}>Carlos Ramírez ha creado una cuenta como candidato.</Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span> Hace 2 horas
                                        </Typography>
                                    </Box>
                                </Box>

                            </Box>
                        </CardContent>
                    </Card>

                </Grid>

                {/* Right Column: KPIs & Health */}
                <Grid item xs={12} lg={4}>

                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                        Hoy en Seniors
                    </Typography>

                    {/* Mini Stats Cards */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                            <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, '&:last-child': { pb: 2 } }}>
                                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}>
                                    <span className="material-symbols-outlined">login</span>
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900 }}>342</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>Inicios de sesión hoy</Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                            <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, '&:last-child': { pb: 2 } }}>
                                <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main', width: 48, height: 48 }}>
                                    <span className="material-symbols-outlined">work_history</span>
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900 }}>12</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>Nuevas vacantes hoy</Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                            <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, '&:last-child': { pb: 2 } }}>
                                <Avatar sx={{ bgcolor: 'error.light', color: 'error.main', width: 48, height: 48 }}>
                                    <span className="material-symbols-outlined">event_busy</span>
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 900 }}>5</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>Vacantes expiradas hoy</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* System Health */}
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                        Estado del Sistema
                    </Typography>

                    <Card elevation={0} sx={{ borderRadius: 4, bgcolor: 'primary.main', color: '#fff' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>dns</span>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Todos los sistemas</Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Operativos (Uptime 99.9%)</Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>API Principal</Typography>
                                    <Chip label="ONLINE" size="small" sx={{ bgcolor: 'success.main', color: '#fff', height: 20, fontSize: '0.65rem', fontWeight: 800 }} />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Base de Datos</Typography>
                                    <Chip label="ONLINE" size="small" sx={{ bgcolor: 'success.main', color: '#fff', height: 20, fontSize: '0.65rem', fontWeight: 800 }} />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Servicio de Correos</Typography>
                                    <Chip label="ONLINE" size="small" sx={{ bgcolor: 'success.main', color: '#fff', height: 20, fontSize: '0.65rem', fontWeight: 800 }} />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminHome;
