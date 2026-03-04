import React, { useState, useEffect } from 'react';

const VacancyDetailModal = ({ vacancyId, onClose }) => {
    const [vacancy, setVacancy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        // Mock inicial
        const initialData = {
            id: vacancyId,
            name: "Desarrollador Full Stack",
            company_name: "Tech Solutions S.A.",
            description: "Buscamos desarrollador experimentado en React y Django con más de 3 años de experiencia.",
            type: "Tiempo Completo",
            type_value: "full_time",
            modality: "Remoto",
            salary_min: "1500.00",
            salary_max: "2500.00",
            is_active: true,
            starts_at: "2026-03-01",
            ends_at: "2026-03-31",
            external_url: "https://ejemplo.com/vacante",
            created_at: "2026-03-01T10:00:00Z",
            categories: ["Tecnología", "Desarrollo de Software"],
            requirements: ["ReactJS", "Django", "PostgreSQL", "Inglés B2"]
        };

        setVacancy(initialData);
        setFormData(initialData);
        setLoading(false);

        // Fetch real
        // const fetchDetail = async () => {
        //   try {
        //     const res = await fetch(`http://localhost:8000/api/admin/vacancies/${vacancyId}/`);
        //     const data = await res.json();
        //     if(res.ok) {
        //       setVacancy(data);
        //       setFormData(data);
        //     }
        //   } catch(err) {
        //     console.error(err);
        //   } finally {
        //     setLoading(false);
        //   }
        // };
        // fetchDetail();
    }, [vacancyId]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        try {
            setSaveLoading(true);

            const payload = {
                name: formData.name,
                description: formData.description,
                salary_min: formData.salary_min,
                salary_max: formData.salary_max,
                starts_at: formData.starts_at,
                ends_at: formData.ends_at,
                external_url: formData.external_url,
                type: formData.type_value // o formData.type segun como se mapee
            };

            // Peticion PUT real
            /*
            const response = await fetch(`http://localhost:8000/api/admin/vacancies/${vacancyId}/`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            if(response.ok) {
              setVacancy({...vacancy, ...payload});
              setIsEditing(false);
            }
            */

            // Mock Save
            setVacancy({ ...vacancy, ...payload });
            setIsEditing(false);

        } catch (err) {
            console.error("Error updating vacancy:", err);
        } finally {
            setSaveLoading(false);
        }
    };

    if (!vacancyId) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                {loading ? (
                    <div className="p-8 text-center text-gray-600 dark:text-gray-300">Cargando detalles...</div>
                ) : vacancy ? (
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="text-2xl font-bold w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
                                />
                            ) : (
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{vacancy.name}</h2>
                            )}
                            <button onClick={() => onClose(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-2xl leading-none ml-4">&times;</button>
                        </div>

                        <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-blue-600 font-semibold">{vacancy.company_name}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className={`text-sm ${vacancy.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                {vacancy.is_active ? 'Activa' : 'Inactiva (Oculta)'}
                            </span>
                        </div>

                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Descripción</h3>
                                {isEditing ? (
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm h-32"
                                    />
                                ) : (
                                    <p className="whitespace-pre-wrap text-sm">{vacancy.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Detalles</h3>
                                    <ul className="text-sm space-y-2">
                                        <li><strong>Tipo:</strong> {vacancy.type}</li>
                                        <li><strong>Modalidad:</strong> {vacancy.modality}</li>
                                        <li className="flex items-center space-x-2">
                                            <strong>Salario:</strong>
                                            {isEditing ? (
                                                <div className="flex space-x-1">
                                                    <input type="number" name="salary_min" value={formData.salary_min || ''} onChange={handleInputChange} className="w-20 px-1 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Min" />
                                                    <span>-</span>
                                                    <input type="number" name="salary_max" value={formData.salary_max || ''} onChange={handleInputChange} className="w-20 px-1 border rounded dark:bg-gray-700 dark:border-gray-600" placeholder="Max" />
                                                </div>
                                            ) : (
                                                <span>${vacancy.salary_min || '??'} - ${vacancy.salary_max || '??'}</span>
                                            )}
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <strong>Link Externo:</strong>
                                            {isEditing ? (
                                                <input type="url" name="external_url" value={formData.external_url || ''} onChange={handleInputChange} className="w-full px-1 border rounded dark:bg-gray-700 dark:border-gray-600 text-xs" />
                                            ) : (
                                                vacancy.external_url ? <a href={vacancy.external_url} target="_blank" rel="noreferrer" className="text-blue-500 underline truncate">{vacancy.external_url}</a> : 'N/A'
                                            )}
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Fechas</h3>
                                    <ul className="text-sm space-y-2">
                                        <li><strong>Publicación:</strong> {new Date(vacancy.created_at).toLocaleDateString()}</li>
                                        <li className="flex flex-col">
                                            <strong>Inicio vigente:</strong>
                                            {isEditing ? (
                                                <input type="date" name="starts_at" value={formData.starts_at || ''} onChange={handleInputChange} className="px-1 border rounded dark:bg-gray-700 dark:border-gray-600 mt-1" />
                                            ) : (
                                                vacancy.starts_at ? new Date(vacancy.starts_at).toLocaleDateString() : 'N/A'
                                            )}
                                        </li>
                                        <li className="flex flex-col">
                                            <strong>Fin vigente:</strong>
                                            {isEditing ? (
                                                <input type="date" name="ends_at" value={formData.ends_at || ''} onChange={handleInputChange} className="px-1 border rounded dark:bg-gray-700 dark:border-gray-600 mt-1" />
                                            ) : (
                                                vacancy.ends_at ? new Date(vacancy.ends_at).toLocaleDateString() : 'N/A'
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Categorías</h3>
                                <div className="flex flex-wrap gap-2">
                                    {vacancy.categories?.length > 0 ? vacancy.categories.map((cat, idx) => (
                                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{cat}</span>
                                    )) : <span className="text-sm text-gray-500">Ninguna definida</span>}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Requisitos</h3>
                                <div className="flex flex-wrap gap-2">
                                    {vacancy.requirements?.length > 0 ? vacancy.requirements.map((req, idx) => (
                                        <span key={idx} className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs px-2 py-1 rounded border dark:border-gray-600">{req}</span>
                                    )) : <span className="text-sm text-gray-500">Ninguno definido</span>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between items-center">
                            <div>
                                {!isEditing && (
                                    <button
                                        onClick={async () => {
                                            if (window.confirm("¿Estás seguro de ELIMINAR definitivamente esta vacante? Esta acción no se puede deshacer y borrará los datos de la base de datos.")) {
                                                setSaveLoading(true);
                                                try {
                                                    /*
                                                    const response = await fetch(`http://localhost:8000/api/admin/vacancies/${vacancyId}/`, {
                                                        method: 'DELETE'
                                                    });
                                                    if(response.ok) {
                                                        onClose(true); // Cerrar y recargar tabla
                                                    }
                                                    */
                                                    // Mock delete
                                                    alert("Vacante eliminada");
                                                    onClose(true);
                                                } catch (err) {
                                                    console.error(err);
                                                } finally {
                                                    setSaveLoading(false);
                                                }
                                            }
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm text-sm font-semibold"
                                    >
                                        Eliminar Definitivamente
                                    </button>
                                )}
                            </div>
                            <div className="flex space-x-3">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() => { setIsEditing(false); setFormData(vacancy); }}
                                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                                            disabled={saveLoading}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                            disabled={saveLoading}
                                        >
                                            {saveLoading ? 'Guardando...' : 'Guardar Cambios'}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Modificar Vacante
                                        </button>
                                        <button
                                            onClick={() => onClose(false)}
                                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                                        >
                                            Cerrar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 text-center text-red-500">Error al cargar la vacante.</div>
                )}
            </div>
        </div>
    );
};

export default VacancyDetailModal;
