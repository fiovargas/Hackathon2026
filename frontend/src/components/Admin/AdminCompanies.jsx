import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import PendingCompaniesList from './PendingCompaniesList';

const AdminCompanies = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: 'text.primary', mb: 1, letterSpacing: '-0.025em' }}>
                        Gestión de Empresas
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                        Administra las empresas registradas en la plataforma.
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    aria-label="company tabs"
                    sx={{
                        '& .MuiTabs-indicator': {
                            height: 3,
                            borderRadius: '3px 3px 0 0',
                        },
                        '& .MuiTab-root': {
                            fontWeight: 600,
                            fontSize: '1rem',
                            textTransform: 'none',
                            minWidth: 120,
                            py: 2,
                        }
                    }}
                >
                    <Tab
                        label="Empresas Activas"
                        {...a11yProps(0)}
                        icon={<span className="material-symbols-outlined" style={{ marginRight: 8, fontSize: 20 }}>business</span>}
                        iconPosition="start"
                    />
                    <Tab
                        label="Empresas Pendientes"
                        {...a11yProps(1)}
                        icon={<span className="material-symbols-outlined" style={{ marginRight: 8, fontSize: 20 }}>pending_actions</span>}
                        iconPosition="start"
                    />
                </Tabs>
            </Box>

            <CustomTabPanel value={tabIndex} index={0}>
                {/* Reutilizando temporalmente el mismo componente de tabla con datos diferentes mockeados */}
                <PendingCompaniesList isActiveTab={true} />
            </CustomTabPanel>

            <CustomTabPanel value={tabIndex} index={1}>
                <PendingCompaniesList isActiveTab={false} />
            </CustomTabPanel>
        </Box>
    );
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`company-tabpanel-${index}`}
            aria-labelledby={`company-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `company-tab-${index}`,
        'aria-controls': `company-tabpanel-${index}`,
    };
}

export default AdminCompanies;
