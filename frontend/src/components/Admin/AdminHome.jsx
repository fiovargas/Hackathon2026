import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, Typography, Grid, Card, CardContent, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AdminHome = () => {
    const theme = useTheme();

    const colors = {
        primary: theme.palette.primary.main,
        dark: theme.palette.text.primary,
        white: theme.palette.background.paper,
        secondary: theme.palette.secondary.main,
        accent: theme.palette.success.main,
        slate: theme.palette.text.secondary,
        red: theme.palette.error.main,
        info: theme.palette.info.main
    };

    const textColor = colors.dark;

    // Mock State for Quick Actions
    const [pendingCompanies, setPendingCompanies] = useState([
        { id: 1, name: "Tech Solutions S.A.", requests: "Aprobación de perfil" },
        { id: 2, name: "Innovateca", requests: "Aprobación de perfil" },
        { id: 3, name: "CloudStream Systems", requests: "Aprobación de perfil" }
    ]);

    const [reportedVacancies, setReportedVacancies] = useState([
        { id: 1, name: "Frontend Developer (JUNIOR EXTREMO)", reports: 2 },
        { id: 2, name: "Marketing Specialist", reports: 1 }
    ]);

    const [openCompaniesModal, setOpenCompaniesModal] = useState(false);
    const [openVacanciesModal, setOpenVacanciesModal] = useState(false);

    const handleApproveCompany = (id) => {
        setPendingCompanies(pendingCompanies.filter(c => c.id !== id));
    };

    const handleDeleteVacancy = (id) => {
        setReportedVacancies(reportedVacancies.filter(v => v.id !== id));
    };

    const barChartOption = {
        title: {
            text: 'Empresas Registradas por Mes',
            textStyle: {
                color: textColor,
                fontWeight: 'bold',
                fontFamily: 'Inter, sans-serif'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                axisTick: { alignWithLabel: true },
                axisLine: { lineStyle: { color: colors.slate } },
                axisLabel: { color: textColor, fontFamily: 'Inter, sans-serif' }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: { show: false },
                axisLabel: { color: textColor, fontFamily: 'Inter, sans-serif' },
                splitLine: { lineStyle: { color: '#f1f5f9' } }
            }
        ],
        series: [
            {
                name: 'Empresas',
                type: 'bar',
                barWidth: '40%',
                data: [10, 52, 200, 334, 390, 330],
                itemStyle: {
                    color: colors.primary,
                    borderRadius: [6, 6, 0, 0]
                }
            }
        ]
    };

    const pieChartOption = {
        title: {
            text: 'Estado de Vacantes',
            left: 'center',
            textStyle: {
                color: textColor,
                fontWeight: 'bold',
                fontFamily: 'Inter, sans-serif'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: '0',
            left: 'center',
            textStyle: { color: textColor, fontFamily: 'Inter, sans-serif' }
        },
        series: [
            {
                name: 'Vacantes',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 8,
                    borderColor: colors.white,
                    borderWidth: 3
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '20',
                        fontWeight: 'bold',
                        color: textColor
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Activas', itemStyle: { color: colors.primary } },
                    { value: 580, name: 'Pendientes', itemStyle: { color: colors.secondary } },
                    { value: 735, name: 'Inactivas', itemStyle: { color: colors.accent } },
                    { value: 484, name: 'Rechazadas', itemStyle: { color: colors.slate } }
                ]
            }
        ]
    };

    const lineChartOptionPasantes = {
        title: {
            text: 'Crecimiento de Pasantes',
            textStyle: {
                color: textColor,
                fontWeight: 'bold',
                fontFamily: 'Inter, sans-serif'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            axisLine: { lineStyle: { color: colors.slate } },
            axisLabel: { color: textColor, fontFamily: 'Inter, sans-serif' }
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisLabel: { color: textColor, fontFamily: 'Inter, sans-serif' },
            splitLine: { lineStyle: { color: '#f1f5f9' } }
        },
        series: [
            {
                name: 'Pasantes',
                type: 'line',
                smooth: true,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{
                            offset: 0, color: `${colors.info}80` // 50% opacity info color
                        }, {
                            offset: 1, color: `${colors.info}10` // 10% opacity info color
                        }]
                    }
                },
                lineStyle: {
                    width: 4,
                    color: colors.info
                },
                itemStyle: {
                    color: colors.info
                },
                data: [120, 230, 450, 680, 950, 1300]
            }
        ]
    };

    return (
        <Box sx={{ width: '100%', pb: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, letterSpacing: '-0.025em' }}>
                        Dashboard Analítico
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                        Métricas principales y panorama general del día.
                    </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 4 }}>update</span>
                    Última actualización: hace 5 minutos
                </Typography>
            </Box>

            {/* Quick Actions Row */}
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary', letterSpacing: '-0.025em' }}>
                Acciones Prioritarias
            </Typography>
            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'warning.light', bgcolor: '#fffdf5', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ p: 4, flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ p: 1.5, bgcolor: 'warning.light', color: 'warning.main', borderRadius: 3 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>domain_add</span>
                                </Box>
                                <Chip label={`Pendientes: ${pendingCompanies.length}`} color="warning" size="small" sx={{ fontWeight: 700 }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>Nuevas Empresas</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                                Hay {pendingCompanies.length} empresas esperando la aprobación de su perfil para empezar a publicar vacantes en la plataforma.
                            </Typography>
                            <Button
                                variant="contained"
                                color="warning"
                                fullWidth
                                sx={{ boxShadow: 'none', color: '#fff', py: 1.5, borderRadius: 2 }}
                                startIcon={<span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>}
                                onClick={() => setOpenCompaniesModal(true)}
                                disabled={pendingCompanies.length === 0}
                            >
                                Revisar Solicitudes
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'error.light', bgcolor: '#fffafa', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ p: 4, flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ p: 1.5, bgcolor: 'error.light', color: 'error.main', borderRadius: 3 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>report</span>
                                </Box>
                                <Chip label={`Reportadas: ${reportedVacancies.length}`} color="error" size="small" sx={{ fontWeight: 700 }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>Vacantes Reportadas</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                                Los usuarios han reportado {reportedVacancies.length} vacantes que posiblemente infringen los términos de la plataforma.
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                fullWidth
                                sx={{ boxShadow: 'none', py: 1.5, borderRadius: 2 }}
                                startIcon={<span className="material-symbols-outlined" style={{ fontSize: 20 }}>gavel</span>}
                                onClick={() => setOpenVacanciesModal(true)}
                                disabled={reportedVacancies.length === 0}
                            >
                                Moderar Vacantes
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Metrics Row */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                {/* Active Users Card */}
                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ mb: 'auto' }}>
                                <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.1em' }}>
                                    TRENDS • LAST 90 DAYS
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
                                    Usuarios Activos
                                </Typography>
                            </Box>

                            <Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                                <Typography variant="h2" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.05em' }}>
                                    39,727
                                </Typography>
                                <Typography variant="subtitle2" sx={{ color: 'success.main', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>trending_up</span>
                                    Up 29.98%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Active Companies Card */}
                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ mb: 'auto' }}>
                                <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.1em' }}>
                                    FUNNEL • THIS MONTH
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
                                    Nuevas Empresas
                                </Typography>
                            </Box>

                            <Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                                <Typography variant="h2" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.05em' }}>
                                    142
                                </Typography>
                                <Typography variant="subtitle2" sx={{ color: 'success.main', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>trending_up</span>
                                    Up 12.5%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* New Vacancies Card */}
                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ mb: 'auto' }}>
                                <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: '0.1em' }}>
                                    TRENDS • THIS WEEK
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
                                    Vacantes Nuevas
                                </Typography>
                            </Box>

                            <Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
                                <Typography variant="h2" sx={{ fontWeight: 900, color: 'text.primary', letterSpacing: '-0.05em' }}>
                                    289
                                </Typography>
                                <Typography variant="subtitle2" sx={{ color: 'success.main', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>trending_up</span>
                                    Up 5.2%
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts Grid */}
            <Grid container spacing={4}>
                {/* Large Chart Full Width */}
                <Grid item xs={12}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                        <CardContent sx={{ p: 3 }}>
                            <ReactECharts option={lineChartOptionPasantes} style={{ height: '700px', width: '100%' }} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Two Charts Half Width (but taller) */}
                <Grid item xs={12} md={6}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                        <CardContent sx={{ p: 3 }}>
                            <ReactECharts option={barChartOption} style={{ height: '700px', width: '100%' }} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                        <CardContent sx={{ p: 3 }}>
                            <ReactECharts option={pieChartOption} style={{ height: '700px', width: '100%' }} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Companies Modal */}
            <Dialog open={openCompaniesModal} onClose={() => setOpenCompaniesModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 800 }}>Revisar Solicitudes de Empresas</DialogTitle>
                <DialogContent dividers>
                    {pendingCompanies.length === 0 ? (
                        <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}>No hay empresas pendientes.</Typography>
                    ) : (
                        <List>
                            {pendingCompanies.map(company => (
                                <ListItem key={company.id} sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 2 }}>
                                    <ListItemText
                                        primary={<Typography fontWeight={800}>{company.name}</Typography>}
                                        secondary={company.requests}
                                    />
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton size="small" color="primary" onClick={() => handleApproveCompany(company.id)} title="Aprobar">
                                            <span className="material-symbols-outlined">check_circle</span>
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleApproveCompany(company.id)} title="Rechazar">
                                            <span className="material-symbols-outlined">cancel</span>
                                        </IconButton>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCompaniesModal(false)} color="inherit">Cerrar</Button>
                </DialogActions>
            </Dialog>

            {/* Vacancies Modal */}
            <Dialog open={openVacanciesModal} onClose={() => setOpenVacanciesModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 800 }}>Moderar Vacantes Reportadas</DialogTitle>
                <DialogContent dividers>
                    {reportedVacancies.length === 0 ? (
                        <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}>No hay vacantes reportadas.</Typography>
                    ) : (
                        <List>
                            {reportedVacancies.map(vacancy => (
                                <ListItem key={vacancy.id} sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 2 }}>
                                    <ListItemText
                                        primary={<Typography fontWeight={800}>{vacancy.name}</Typography>}
                                        secondary={`${vacancy.reports} reporte(s)`}
                                    />
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteVacancy(vacancy.id)}>
                                            Eliminar
                                        </Button>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenVacanciesModal(false)} color="inherit">Cerrar</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default AdminHome;
