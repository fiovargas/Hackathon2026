import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AdminAnalytics = () => {
    const theme = useTheme();

    const colors = {
        primary: theme.palette.primary.main,
        dark: theme.palette.text.primary,
        white: theme.palette.background.paper,
        secondary: theme.palette.secondary.main,
        accent: theme.palette.success.main,
        slate: theme.palette.text.secondary,
        red: theme.palette.error.main
    };

    const textColor = colors.dark;

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
                barWidth: '50%',
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
                radius: ['45%', '75%'],
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

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, letterSpacing: '-0.025em' }}>
                    Resumen General
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                    Analíticas y estadísticas de la plataforma.
                </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card elevation={0} sx={{ p: 1, borderRadius: 4 }}>
                        <CardContent>
                            <ReactECharts option={barChartOption} style={{ height: '350px', width: '100%' }} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card elevation={0} sx={{ p: 1, borderRadius: 4 }}>
                        <CardContent>
                            <ReactECharts option={pieChartOption} style={{ height: '350px', width: '100%' }} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Stats Cards */}
                <Grid item xs={12} sm={6} lg={3}>
                    <Card elevation={0} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 4, height: '100%', transition: 'opacity 0.2s', '&:hover': { opacity: 0.9 }, cursor: 'pointer' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, '&:last-child': { pb: 3 } }}>
                            <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 3, alignSelf: 'flex-start' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>domain</span>
                            </Box>
                            <Box>
                                <Typography variant="h3" sx={{ fontWeight: 900, mb: 0.5 }}>142</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, opacity: 0.9 }}>Empresas Activas</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <Card elevation={0} sx={{ borderRadius: 4, height: '100%', transition: 'all 0.2s', '&:hover': { borderColor: 'divider', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }, cursor: 'pointer' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, '&:last-child': { pb: 3 } }}>
                            <Box sx={{ p: 1.5, bgcolor: 'secondary.light', color: 'secondary.main', borderRadius: 3, alignSelf: 'flex-start', opacity: 0.8 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>work</span>
                            </Box>
                            <Box>
                                <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 0.5 }}>28</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Vacantes Nuevas</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <Card elevation={0} sx={{ borderRadius: 4, height: '100%', transition: 'all 0.2s', '&:hover': { borderColor: 'divider', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }, cursor: 'pointer' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, '&:last-child': { pb: 3 } }}>
                            <Box sx={{ p: 1.5, bgcolor: 'success.light', color: 'primary.main', borderRadius: 3, alignSelf: 'flex-start', opacity: 0.6 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>groups</span>
                            </Box>
                            <Box>
                                <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 0.5 }}>3,892</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Candidatos Activos</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} lg={3}>
                    <Card elevation={0} sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 4, height: '100%', transition: 'opacity 0.2s', '&:hover': { opacity: 0.9 }, cursor: 'pointer' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, '&:last-child': { pb: 3 } }}>
                            <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 3, alignSelf: 'flex-start' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>handshake</span>
                            </Box>
                            <Box>
                                <Typography variant="h3" sx={{ fontWeight: 900, mb: 0.5 }}>45</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, opacity: 0.9 }}>Contrataciones Mensuales</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminAnalytics;
