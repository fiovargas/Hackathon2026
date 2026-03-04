import React from 'react';
import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';

const AdminRecentChanges = () => {
    return (
        <Box sx={{ width: '100%', pb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, letterSpacing: '-0.025em' }}>
                    Cambios Recientes
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                    Registro histórico de la actividad en la plataforma.
                </Typography>
            </Box>

            <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>Línea de Tiempo de Actividad</Typography>
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

                        {/* Custom Timeline Item */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 3, position: 'relative' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar sx={{ bgcolor: 'error.light', color: 'error.main', width: 40, height: 40 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>report</span>
                                </Avatar>
                                <Box sx={{ width: 2, bgcolor: 'divider', flexGrow: 1, my: 1, minHeight: 40 }} />
                            </Box>
                            <Box sx={{ pb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Usuario Anónimo</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>reportó una vacante</Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.primary', mb: 1 }}>Vacante "Frontend Developer JUNIOR EXTREMO"</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>schedule</span> Hace 1.5 horas
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
        </Box>
    );
};

export default AdminRecentChanges;
