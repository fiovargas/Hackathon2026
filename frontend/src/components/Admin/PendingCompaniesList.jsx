import React, { useState } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button
} from '@mui/material';

const CompanyRow = ({ id, name, email, date, onApprove, onReject }) => (
    <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row" sx={{ fontWeight: 700, color: 'text.primary', py: 2.5 }}>
            {name}
        </TableCell>
        <TableCell sx={{ color: 'text.secondary', py: 2.5 }}>{email}</TableCell>
        <TableCell sx={{ color: 'text.secondary', py: 2.5 }}>{date}</TableCell>
        <TableCell align="right" sx={{ py: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>}
                    sx={{ boxShadow: 'none', px: 2, py: 1 }}
                    onClick={() => onApprove(id)}
                >
                    Aprobar
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>cancel</span>}
                    sx={{ bgcolor: '#fff', px: 2, py: 1, '&:hover': { bgcolor: 'error.main', color: '#fff' } }}
                    onClick={() => onReject(id)}
                >
                    Rechazar
                </Button>
            </Box>
        </TableCell>
    </TableRow>
);

const PendingCompaniesList = ({ isActiveTab }) => {
    // Aquí debería venir la lógica para obtener empresas del backend filtradas por "is_active"
    // temporalmente mockearemos la data
    const [companies, setCompanies] = useState([
        {
            id: 1,
            name: "Tech Solutions S.A.",
            email: "contacto@techsolutions.com",
            createdAt: "1/3/2026",
            is_active: false
        },
        {
            id: 2,
            name: "Innovateca",
            email: "rrhh@innovateca.io",
            createdAt: "2/3/2026",
            is_active: false
        },
        {
            id: 3,
            name: "Global Tech",
            email: "info@globaltech.com",
            createdAt: "20/2/2026",
            is_active: true
        },
        {
            id: 4,
            name: "CloudStream Systems",
            email: "admin@cloudstream.net",
            createdAt: "2/3/2026",
            is_active: false
        },
        {
            id: 5,
            name: "Dev Corp",
            email: "dev@corp.net",
            createdAt: "10/1/2026",
            is_active: true
        }
    ]);

    const activeCompanies = companies.filter(c => c.is_active === isActiveTab);


    const handleDeactivate = (id) => {
        // Lógica para desactivar empresa
        setCompanies(companies.map(c => c.id === id ? { ...c, is_active: false } : c));
    };

    const handleApprove = (id) => {
        setCompanies(companies.map(c => c.id === id ? { ...c, is_active: true } : c));
    };

    const handleReject = (id) => {
        setCompanies(companies.filter(c => c.id !== id));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 4, display: 'none' }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, letterSpacing: '-0.025em' }}>
                    Empresas Pendientes
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                    Revisiones pendientes para nuevas empresas en la plataforma.
                </Typography>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Empresa</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Contacto</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Fecha</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeCompanies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    No hay {isActiveTab ? 'empresas activas' : 'empresas pendientes'}.
                                </TableCell>
                            </TableRow>
                        ) : (
                            activeCompanies.map(company => (
                                <TableRow hover key={company.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 700, color: 'text.primary', py: 2.5 }}>
                                        {company.name}
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.secondary', py: 2.5 }}>{company.email}</TableCell>
                                    <TableCell sx={{ color: 'text.secondary', py: 2.5 }}>{company.createdAt}</TableCell>
                                    <TableCell align="right" sx={{ py: 2.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                                            {!isActiveTab ? (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        startIcon={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>}
                                                        sx={{ boxShadow: 'none', px: 2, py: 1 }}
                                                        onClick={() => handleApprove(company.id)}
                                                    >
                                                        Aprobar
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        size="small"
                                                        startIcon={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>cancel</span>}
                                                        sx={{ bgcolor: '#fff', px: 2, py: 1, '&:hover': { bgcolor: 'error.main', color: '#fff' } }}
                                                        onClick={() => handleReject(company.id)}
                                                    >
                                                        Rechazar
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    startIcon={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>block</span>}
                                                    sx={{ bgcolor: '#fff', px: 2, py: 1, '&:hover': { bgcolor: 'error.main', color: '#fff' } }}
                                                    onClick={() => handleDeactivate(company.id)}
                                                >
                                                    Desactivar
                                                </Button>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default PendingCompaniesList;
