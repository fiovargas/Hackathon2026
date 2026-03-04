import React, { useState } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, IconButton, Chip, TextField,
    MenuItem, InputAdornment, Pagination
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import VacancyDetailModal from './VacancyDetailModal';

const VacanciesList = () => {
    const theme = useTheme();
    const [vacancies, setVacancies] = useState([
        {
            id: 1,
            name: "Desarrollador Full Stack",
            company_name: "Tech Solutions S.A.",
            description: "Buscamos desarrollador experimentado en React y Django.",
            is_active: true,
            starts_at: "2026-03-01",
            ends_at: "2026-03-31",
            created_at: "2026-03-01T10:00:00Z"
        },
        {
            id: 2,
            name: "Data Analyst",
            company_name: "Innovateca",
            description: "Analista de datos con conocimientos en SQL y PowerBI.",
            is_active: true,
            starts_at: "2026-03-02",
            ends_at: "2026-04-02",
            created_at: "2026-03-02T14:30:00Z"
        },
        {
            id: 3,
            name: "Frontend Developer (JUNIOR EXTREMO)",
            company_name: "Startup Inc",
            description: "Buscamos un junior con 10 años de experiencia que trabaje gratis.",
            is_active: true,
            is_reported: true,
            starts_at: "2026-03-03",
            ends_at: "2026-03-10",
            created_at: "2026-03-03T09:00:00Z"
        }
    ]);

    const [selectedVacancyId, setSelectedVacancyId] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCompany, setFilterCompany] = useState('');

    const handleToggleActive = async (id, currentStatus) => {
        setVacancies(vacancies.map(v => v.id === id ? { ...v, is_active: !currentStatus } : v));
    };

    const handleDelete = (id) => {
        setVacancies(vacancies.filter(v => v.id !== id));
    };

    const filteredVacancies = vacancies.filter(v => {
        if (filterStatus === 'active' && !v.is_active) return false;
        if (filterStatus === 'inactive' && v.is_active) return false;
        if (filterStatus === 'expired' && v.ends_at && new Date(v.ends_at) >= new Date()) return false;
        if (filterCompany && v.company_name.toLowerCase().indexOf(filterCompany.toLowerCase()) === -1) return false;
        return true;
    });

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, gap: 2 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, letterSpacing: '-0.025em' }}>
                        Vacantes Publicadas
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                        Gestiona el estado y visibilidad de las vacantes en la plataforma.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: { xs: '100%', md: 'auto' } }}>
                    <TextField
                        size="small"
                        placeholder="Filtrar por empresa..."
                        value={filterCompany}
                        onChange={(e) => setFilterCompany(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: theme.palette.text.secondary }}>search</span>
                                </InputAdornment>
                            ),
                            sx: { bgcolor: 'background.paper', borderRadius: 2 }
                        }}
                        sx={{ width: { xs: '100%', sm: 250 } }}
                    />
                    <TextField
                        select
                        size="small"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        InputProps={{ sx: { bgcolor: 'background.paper', borderRadius: 2 } }}
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="all">Todas las vacantes</MenuItem>
                        <MenuItem value="active">Solo Activas</MenuItem>
                        <MenuItem value="inactive">Solo Inactivas (Ocultas)</MenuItem>
                        <MenuItem value="expired">Solo Vencidas</MenuItem>
                    </TextField>
                </Box>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Vacante</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Empresa</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Fechas</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Estado</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredVacancies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                                    No hay vacantes registradas que coincidan con los filtros.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredVacancies.map((v) => (
                                <TableRow hover key={v.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>{v.name}</Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 0.5 }}>
                                            {v.description}
                                        </Typography>
                                        {v.is_reported && (
                                            <Chip label="Reportada" size="small" color="error" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800 }} />
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ py: 2.5, fontWeight: 600, color: 'text.secondary' }}>{v.company_name}</TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 16, color: theme.palette.primary.main }}>calendar_today</span>
                                                Pub: {new Date(v.created_at).toLocaleDateString()}
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: '0.75rem' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 16, color: theme.palette.error.light }}>timer</span>
                                                Exp: {v.ends_at ? new Date(v.ends_at).toLocaleDateString() : 'N/A'}
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Chip
                                            label={v.is_active ? 'Activa' : 'Inactiva'}
                                            size="small"
                                            sx={{
                                                fontWeight: 800,
                                                bgcolor: v.is_active ? 'primary.light' : 'error.light',
                                                color: v.is_active ? 'primary.contrastText' : 'error.contrastText',
                                                '& .MuiChip-label': { px: 2 }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right" sx={{ py: 2.5 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                                            <IconButton
                                                onClick={() => handleToggleActive(v.id, v.is_active)}
                                                size="small"
                                                sx={{
                                                    border: '1px solid',
                                                    borderColor: v.is_active ? 'warning.light' : 'primary.light',
                                                    color: v.is_active ? 'warning.main' : 'primary.main',
                                                    bgcolor: 'background.paper',
                                                    '&:hover': { bgcolor: v.is_active ? 'warning.light' : 'primary.light' }
                                                }}
                                                title={v.is_active ? 'Ocultar Vacante' : 'Activar Vacante'}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                                                    {v.is_active ? 'visibility_off' : 'visibility'}
                                                </span>
                                            </IconButton>

                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                onClick={() => setSelectedVacancyId(v.id)}
                                                startIcon={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>}
                                                sx={{ boxShadow: 'none', px: 2, minWidth: 'auto' }}
                                            >
                                                Editar
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDelete(v.id)}
                                                startIcon={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>}
                                                sx={{ bgcolor: 'background.paper', px: 2, '&:hover': { bgcolor: 'error.main', color: '#fff' } }}
                                            >
                                                Eliminar
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Mostrando {filteredVacancies.length} de {vacancies.length} vacantes
                </Typography>
                <Pagination count={2} color="primary" shape="rounded" />
            </Box>

            {selectedVacancyId && (
                <VacancyDetailModal
                    vacancyId={selectedVacancyId}
                    onClose={() => setSelectedVacancyId(null)}
                />
            )}
        </Box>
    );
};

export default VacanciesList;
