import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Mail, Phone, Calendar, UserPlus, Trash2, Search, Filter, Users } from 'lucide-react';
import './InstitutoFormacion.css';

// Solo datos estáticos de cómo se verían los estudiantes vinculados
const staticStudents = [
    { rel_id: 1, name: 'Juan', last_name: 'Pérez', email: 'juan@example.com', phone: '12345678', image_url: null, rel_created_at: '2023-10-02' },
    { rel_id: 2, name: 'María', last_name: 'Gómez', email: 'maria@example.com', phone: '87654321', image_url: null, rel_created_at: '2023-11-16' },
    { rel_id: 3, name: 'Carlos', last_name: 'López', email: 'carlos@example.com', phone: '11223344', image_url: null, rel_created_at: '2024-01-10' }
];

function InstitutoFormacion() {
    const [sortOrder, setSortOrder] = useState('newest');

    // Simulación de quitar estudiante mostrando solo la alerta visual
    const handleRemoveStudent = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "El estudiante ya no estará relacionado a tu institución.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#cbd5e1',
            confirmButtonText: 'Sí, Quitar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Eliminado', 'La relación ha sido desactivada. (Simulación Visual)', 'success');
            }
        });
    };

    const handleAddByEmail = () => {
        Swal.fire({
            title: 'Invitar Usuario',
            input: 'text',
            inputLabel: 'Ingresa el correo, nombre o apellido',
            inputPlaceholder: 'ejemplo@correo.com',
            showCancelButton: true,
            confirmButtonText: 'Buscar e Invitar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#4f46e5',
            inputValidator: (value) => {
                if (!value) {
                    return '¡Necesitas escribir algo para buscar!';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('¡Invitación Enviada!', `Se enviaría el correo a: ${result.value} (Simulación Visual)`, 'success');
            }
        });
    };

    const handleAddByExcel = () => {
        Swal.fire({
            title: 'Subir Excel',
            text: "El archivo DEBE contener las columnas: nombre, apellido y correo (o variantes).",
            input: 'file',
            inputAttributes: {
                'accept': '.xlsx, .xls, .csv',
                'aria-label': 'Sube tu archivo Excel'
            },
            showCancelButton: true,
            confirmButtonText: 'Procesar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#4f46e5'
        }).then((result) => {
            if (result.isConfirmed) {
                if (!result.value) {
                    Swal.fire('Error', 'No seleccionaste ningún archivo', 'error');
                    return;
                }
                Swal.fire({
                    title: 'Procesando File...',
                    text: 'Simulando validación e invitación masiva...',
                    icon: 'info',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    Swal.fire('¡Completado!', 'Simulación de subida de Excel correcta. (Simulación Visual)', 'success');
                });
            }
        });
    };

    const handleAddStudent = () => {
        Swal.fire({
            title: 'Agregar Usuarios',
            text: '¿Cómo deseas agregar a los usuarios a tu instituto?',
            icon: 'question',
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: 'Por Correo / Nombre',
            denyButtonText: 'Subir Excel',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#4f46e5',
            denyButtonColor: '#10b981'
        }).then((result) => {
            if (result.isConfirmed) {
                handleAddByEmail();
            } else if (result.isDenied) {
                handleAddByExcel();
            }
        });
    };

    // Re-ordenar la visual estática basándose en sortOrder
    const sortedStudents = [...staticStudents].sort((a, b) => {
        const dateA = new Date(a.rel_created_at).getTime();
        const dateB = new Date(b.rel_created_at).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return (
        <div className="instituto-container">
            <div className="instituto-header">
                <div>
                    <h1 className="instituto-title">Dashboard Instituto de Formación</h1>
                    <p className="instituto-subtitle">Gestiona a los estudiantes relacionados a tu institución.</p>
                </div>

                <div className="instituto-actions">
                    <div style={{ position: 'relative' }}>
                        <select
                            className="instituto-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="newest">Más nuevos primero</option>
                            <option value="oldest">Más antiguos primero</option>
                        </select>
                    </div>

                    <button className="btn-primary" onClick={handleAddStudent}>
                        <UserPlus size={18} />
                        Agregar Estudiantes
                    </button>
                </div>
            </div>

            <div className="students-grid">
                {sortedStudents.map((student) => (
                    <div key={student.rel_id} className="student-card">
                        <div className="student-header">
                            {student.image_url ? (
                                <img src={student.image_url} alt={student.name} className="student-avatar" />
                            ) : (
                                <div className="student-avatar-fallback">
                                    {student.name.charAt(0)}{student.last_name.charAt(0)}
                                </div>
                            )}
                            <div className="student-info">
                                <h3>{student.name} {student.last_name}</h3>
                                <p>Añadido: {student.rel_created_at}</p>
                            </div>
                        </div>

                        <div className="student-details">
                            <div className="detail-row">
                                <Mail size={16} className="detail-icon" />
                                <span>{student.email}</span>
                            </div>
                            <div className="detail-row">
                                <Phone size={16} className="detail-icon" />
                                <span>{student.phone}</span>
                            </div>
                        </div>

                        <div className="student-actions">
                            <button
                                className="btn-danger"
                                onClick={handleRemoveStudent}
                            >
                                <Trash2 size={16} />
                                Quitar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InstitutoFormacion;