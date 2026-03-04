import React, { useState } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Chip, Avatar
} from '@mui/material';

const AdminModerators = () => {
    // Mock data temporalmente
    const [moderators, setModerators] = useState([
        {
            id: 1,
            name: "Ana",
            lastName: "Gómez",
            email: "ana.gomez@admin.com",
            role: "Administrador",
            isActive: true,
            createdAt: "20/02/2026",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
        },
        {
            id: 2,
            name: "Luis",
            lastName: "Martínez",
            email: "luis.martinez@admin.com",
            role: "Super Admin",
            isActive: true,
            createdAt: "05/01/2026",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
        },
        {
            id: 3,
            name: "Carla",
            lastName: "Jiménez",
            email: "carla.jimenez@admin.com",
            role: "Administrador",
            isActive: false,
            createdAt: "15/10/2025",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d"
        }
    ]);

    const handleToggleActive = (id) => {
        setModerators(moderators.map(mod =>
            mod.id === id ? { ...mod, isActive: !mod.isActive } : mod
        ));
    };

    const handlePromote = (id) => {
        setModerators(moderators.map(mod =>
            mod.id === id ? { ...mod, role: "Super Admin" } : mod
        ));
    };

    return (
        <Box sx={{ width: '100%', animation: 'fadeIn 0.5s ease-in-out' }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, letterSpacing: '-0.025em' }}>
                        Moderadores del Sistema
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                        Gestiona los administradores y staff de la plataforma.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<span className="material-symbols-outlined">person_add</span>}
                    sx={{ borderRadius: 2, px: 3, py: 1.5, boxShadow: 'none' }}
                >
                    Invitar Moderador
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Usuario</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Rol</TableCell>
                            <TableCell sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Estado</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', py: 2 }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {moderators.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                    No hay moderadores registrados.
                                </TableCell>
                            </TableRow>
                        ) : (
                            moderators.map((mod) => (
                                <TableRow hover key={mod.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ py: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar src={mod.avatar} alt={`${mod.name} ${mod.lastName}`} sx={{ width: 40, height: 40, border: '1px solid', borderColor: 'divider' }} />
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                                {mod.name} {mod.lastName}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.secondary', py: 2 }}>{mod.email}</TableCell>
                                    <TableCell sx={{ py: 2 }}>
                                        <Chip
                                            label={mod.role}
                                            size="small"
                                            color={mod.role === 'Super Admin' ? 'secondary' : 'default'}
                                            sx={{ fontWeight: 600, fontSize: '0.75rem', borderRadius: 1 }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ py: 2 }}>
                                        <Chip
                                            label={mod.isActive ? 'Activo' : 'Inactivo'}
                                            size="small"
                                            color={mod.isActive ? 'success' : 'error'}
                                            variant={mod.isActive ? 'filled' : 'outlined'}
                                            sx={{ fontWeight: 700, fontSize: '0.75rem' }}
                                            icon={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                                                {mod.isActive ? 'check_circle' : 'cancel'}
                                            </span>}
                                        />
                                    </TableCell>
                                    <TableCell align="right" sx={{ py: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            {mod.role !== 'Super Admin' && (
                                                <Button
                                                    variant="text"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handlePromote(mod.id)}
                                                    sx={{ fontWeight: 600, textTransform: 'none' }}
                                                >
                                                    Ascender
                                                </Button>
                                            )}
                                            <Button
                                                variant="outlined"
                                                color={mod.isActive ? 'error' : 'success'}
                                                size="small"
                                                onClick={() => handleToggleActive(mod.id)}
                                                sx={{
                                                    fontWeight: 600,
                                                    textTransform: 'none',
                                                    bgcolor: '#fff',
                                                    '&:hover': { bgcolor: mod.isActive ? 'error.main' : 'success.main', color: '#fff' }
                                                }}
                                            >
                                                {mod.isActive ? 'Desactivar' : 'Activar'}
                                            </Button>
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

export default AdminModerators;
