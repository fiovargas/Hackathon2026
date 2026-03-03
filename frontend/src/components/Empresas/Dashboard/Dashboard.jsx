import React, { useState } from 'react';
import VacanciesList from '../Vacancies/VacanciesList/VacanciesList';
import CreateVacancy from '../Vacancies/CreateVacancy/CreateVacancy';
import ApplicationsList from '../Vacancies/ApplicationsList/ApplicationsList';
import './Dashboard.css';

const Dashboard = () => {
    // 'list' | 'create' | 'applications'
    const [activeView, setActiveView] = useState('list');
    const [selectedVacancyId, setSelectedVacancyId] = useState(null);

    const handleViewApplicants = (vacancyId) => {
        setSelectedVacancyId(vacancyId);
        setActiveView('applications');
    };

    const renderView = () => {
        switch (activeView) {
            case 'list':
                return <VacanciesList onViewApplicants={handleViewApplicants} />;
            case 'create':
                return <CreateVacancy />;
            case 'applications':
                return (
                    <div>
                        <button
                            className="btn-back"
                            onClick={() => setActiveView('list')}
                            style={{
                                marginBottom: '1rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#e5e7eb',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            ← Volver al Listado
                        </button>
                        <ApplicationsList vacancyId={selectedVacancyId} />
                    </div>
                );
            default:
                return <VacanciesList onViewApplicants={handleViewApplicants} />;
        }
    };

    return (
        <div className="empresas-dashboard">
            {/* Sidebar Navigation */}
            <aside className="empresas-sidebar">
                <div className="sidebar-header">
                    <h2>Portal Empresa</h2>
                </div>
                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeView === 'list' || activeView === 'applications' ? 'active' : ''}`}
                        onClick={() => setActiveView('list')}
                    >
                        Mis Vacantes
                    </button>
                    <button
                        className={`nav-item ${activeView === 'create' ? 'active' : ''}`}
                        onClick={() => setActiveView('create')}
                    >
                        Crear Vacante
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="empresas-content">
                <header className="empresas-dashboard-header">
                    <div className="user-profile-summary">
                        <span className="user-name">Empresa Administrador</span>
                        <div className="user-avatar">EA</div>
                    </div>
                </header>

                <div className="dashboard-view-container">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
