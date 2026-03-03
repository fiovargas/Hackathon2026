import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./InstitutoFormacion.css";
import { Pencil, Trash2 } from "lucide-react";

const InstitutoFormacion = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("desc");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [newUser, setNewUser] = useState({
    image_url: "",
    name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  // 🔥 SOLO se ejecuta una vez
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const mock = [
      {
        id: 1,
        image_url: "https://i.pravatar.cc/50",
        name: "Juan",
        last_name: "Pérez",
        email: "juan@email.com",
        phone: "8888-8888",
        created_at: "2026-03-01",
      },
    ];

    setStudents(mock);
  };

  // 🔥 ORDEN DINÁMICO (NO sobrescribe estado)
  const sortedStudents = [...students].sort((a, b) =>
    filter === "desc"
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at)
  );

  // ❌ Quitar estudiante
  const handleRemove = (id) => {
    Swal.fire({
      title: "¿Quitar estudiante?",
      text: "La relación será desactivada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, quitar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setStudents((prev) => prev.filter((s) => s.id !== id));
        Swal.fire("Desactivado", "Relación eliminada correctamente", "success");
      }
    });
  };

  // ✏️ Editar estudiante (simulación)
    const handleEdit = (student) => {
    Swal.fire({
        icon: "info",
        title: "Editar usuario",
        text: `Editar datos de ${student.name} ${student.last_name}`,
    });
    };

  // 🔍 Buscar usuarios (simulación)
  const handleSearch = () => {
    if (!search) return;

    const mockResults = [
      {
        id: 99,
        name: "Carlos",
        last_name: "Ramírez",
        email: "carlos@email.com",
      },
    ];

    setSearchResults(mockResults);
  };

  // 📩 Invitar y agregar
  const handleInvite = (user) => {
    const newStudent = {
      id: Date.now(),
      image_url: "https://i.pravatar.cc/50",
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      phone: "No registrado",
      created_at: new Date().toISOString().split("T")[0],
    };

    setStudents((prev) => [newStudent, ...prev]);

    Swal.fire({
      icon: "success",
      title: "Usuario agregado",
      text: `${user.email} ahora pertenece al instituto`,
    });
  };

  // 📊 Subir Excel (simulación)
  const handleExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".csv")) {
      Swal.fire({
        icon: "error",
        title: "Formato incorrecto",
        text: "Debe subir un archivo Excel válido (.xlsx o .csv)",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Archivo cargado",
      text: "Simulación: usuarios agregados localmente",
    });
  };

  // 🆕 Crear usuario manual
  const handleCreateUser = () => {
    if (!newUser.name || !newUser.last_name || !newUser.email) {
      Swal.fire("Error", "Nombre, apellido y correo son obligatorios", "error");
      return;
    }

    const createdUser = {
      id: Date.now(),
      image_url: newUser.image_url || "https://i.pravatar.cc/50",
      name: newUser.name,
      last_name: newUser.last_name,
      email: newUser.email,
      phone: newUser.phone || "No registrado",
      created_at: new Date().toISOString().split("T")[0],
    };

    setStudents((prev) => [createdUser, ...prev]);

    Swal.fire("Creado", "Usuario agregado correctamente", "success");

    setNewUser({
      image_url: "",
      name: "",
      last_name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="students-container">
      <div className="students-header">
        <h2>Estudiantes</h2>

        <div className="students-actions">
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="desc">Más nuevos</option>
            <option value="asc">Más viejos</option>
          </select>

          <button className="add-btn" onClick={() => setShowModal(true)}>
            Agregar Usuarios
          </button>
        </div>
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Fecha</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.map((s) => (
            <tr key={s.id}>
              <td>
                <img src={s.image_url} alt="profile" />
              </td>
              <td>{s.name} {s.last_name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.created_at}</td>
                <td className="actions-cell">
                <button
                    className="edit-btn"
                    onClick={() => handleEdit(s)}
                >
                    <Pencil size={16} />
                    Editar
                </button>

                <button
                    className="remove-btn"
                    onClick={() => handleRemove(s.id)}
                >
                    <Trash2 size={16} />
                    Eliminar
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🟦 MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Agregar Usuarios</h3>

            <div className="manual-section">
              <h4>Crear Usuario Manualmente</h4>

              <input
                type="text"
                placeholder="URL Imagen"
                value={newUser.image_url}
                onChange={(e) =>
                  setNewUser({ ...newUser, image_url: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Nombre"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Apellido"
                value={newUser.last_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, last_name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Correo"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />

              <button onClick={handleCreateUser}>Crear Usuario</button>
            </div>

            <hr />

            <div className="invite-section">
              <h4>Invitar Usuario</h4>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Buscar por nombre o correo"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
              </div>

              {searchResults.map((user) => (
                <div key={user.id} className="search-result">
                  <span>
                    {user.name} {user.last_name} - {user.email}
                  </span>
                  <button onClick={() => handleInvite(user)}>
                    Agregar
                  </button>
                </div>
              ))}
            </div>

            <hr />

            <div className="excel-section">
              <h4>Registrar mediante Excel</h4>
              <input type="file" onChange={handleExcel} />
              <p className="excel-info">
                El archivo debe contener: Nombre, Apellido y Correo
              </p>
            </div>

            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutoFormacion;