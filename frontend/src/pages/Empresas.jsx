import React, { useState } from 'react'
import SidebarEmpresas from '../components/Empresas/SidebarEmpresas/SidebarEmpresas'
import HeaderEmpresas from '../components/Empresas/HeaderEmpresas/HeaderEmpresas'
import MetricasCard from '../components/Empresas/MetricasCard/MetricasCard'
import TablaPostulaciones from '../components/Empresas/TablaPostulaciones/TablaPostulaciones'
import MisOfertas from '../components/Empresas/MisOfertas/MisOfertas'
import FiltrosPostulaciones from '../components/Empresas/FiltrosPostulaciones/FiltrosPostulaciones'
import ModalEtiquetas from '../components/Empresas/ModalEtiquetas/ModalEtiquetas'
import ModalContratado from '../components/Empresas/ModalContratado/ModalContratado'
import PerfilEmpresa from '../components/Empresas/PerfilEmpresa/PerfilEmpresa'
import Configuracion from '../components/Empresas/Configuracion/Configuracion'
import FormularioVacante from '../components/Empresas/FormularioVacante/FormularioVacante'

function Empresas() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [filtrosAberto, setFiltrosAberto] = useState(false)
  const [etiquetasAberto, setEtiquetasAberto] = useState(false)
  const [contratadoAberto, setContratadoAberto] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className={`empresas-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <SidebarEmpresas
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <HeaderEmpresas isSidebarOpen={isSidebarOpen} />

      <div className="empresas-main-content">
        {/* Dashboard */}
        {activeSection === 'dashboard' && (
          <>
            <MetricasCard />
            <TablaPostulaciones onFilterClick={() => setFiltrosAberto(true)} />
          </>
        )}

        {/* Mis Ofertas */}
        {activeSection === 'ofertas' && (
          <MisOfertas />
        )}

        {/* Candidatos */}
        {activeSection === 'candidatos' && (
          <>
            <MetricasCard />
            <TablaPostulaciones onFilterClick={() => setFiltrosAberto(true)} />
          </>
        )}

        {/* Perfil */}
        {activeSection === 'perfil' && (
          <PerfilEmpresa />
        )}

        {/* Configuración */}
        {activeSection === 'configuracion' && (
          <Configuracion />
        )}
      </div>

      {/* Modales */}
      <FiltrosPostulaciones
        isOpen={filtrosAberto}
        onClose={() => setFiltrosAberto(false)}
        onAplicarFiltros={(filtros) => console.log('Filtros aplicados:', filtros)}
      />

      <ModalEtiquetas
        isOpen={etiquetasAberto}
        onClose={() => setEtiquetasAberto(false)}
        onSaveEtiquetas={(etiquetas) => console.log('Etiquetas guardadas:', etiquetas)}
        candidatoNombre="Juan Pérez"
      />

      <ModalContratado
        isOpen={contratadoAberto}
        onClose={() => setContratadoAberto(false)}
        onConfirmar={(datos) => console.log('Contratado:', datos)}
        candidatoNombre="Juan Pérez"
        puesto="Ingeniero de Calidad"
      />
    </div>
  )
}

export default Empresas