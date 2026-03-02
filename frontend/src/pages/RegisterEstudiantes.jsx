import React, { useState } from 'react';
import { postData } from '../services/api'; // Tu servicio adaptado a Axios
import FormInput from '../components/Register estudiantes/FormInput';
import Checkbox from '../components/Register estudiantes/Checkbox';
import '../components/Register estudiantes/RegisterPage.css'; 

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: '', // Opcional
        password: '',
        consent: false
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Enviamos al endpoint de Django
            await postData(formData, 'users/student-register');
            alert("¡Registro exitoso! Ya puedes iniciar sesión.");
        } catch (error) {
            const errorMsg = error.response?.data?.email ? "El email ya existe" : "Error en el registro";
            alert(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                <div className="register-header">
                    <h2>Crear Cuenta</h2>
                    <p>Completa tus datos para empezar</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="row">
                        <FormInput label="Nombre" name="name" onChange={handleChange} required />
                        <FormInput label="Apellido" name="last_name" onChange={handleChange} required />
                    </div>

                    <FormInput label="Email" name="email" type="email" onChange={handleChange} required placeholder="ejemplo@correo.com" />
                    <FormInput label="Teléfono" name="phone" type="tel" onChange={handleChange} placeholder="Opcional" />
                    <FormInput label="Contraseña" name="password" type="password" onChange={handleChange} required />

                    <Checkbox 
                        label="Acepto los términos, condiciones y el tratamiento de mis datos" 
                        name="consent" 
                        onChange={handleChange} 
                        required 
                    />

                    <button type="submit" className="btn-register" disabled={loading}>
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;