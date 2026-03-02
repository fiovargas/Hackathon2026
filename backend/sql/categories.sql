# Categorias
INSERT INTO category (id, name) VALUES
(1,  'Tecnología / Desarrollo de Software'),
(2,  'Sistemas / Infraestructura / DevOps'),
(3,  'Datos / BI / Analítica'),
(4,  'Seguridad / Ciberseguridad / Compliance TI'),
(5,  'Producto / Product Management'),
(6,  'Diseño / UX/UI'),
(7,  'Operaciones / Procesos'),
(8,  'Logística / Supply Chain / Inventario'),
(9,  'Compras / Procurement / Abastecimiento'),
(10, 'Calidad / QA / Mejora Continua'),
(11, 'Finanzas / Contabilidad'),
(12, 'Riesgo / Auditoría / Control Interno'),
(13, 'Ventas / Comercial'),
(14, 'Marketing / Growth'),
(15, 'Atención al Cliente / Soporte / Servicio'),
(16, 'Recursos Humanos / Talento'),
(17, 'Legal / Jurídico'),
(18, 'Administración / Dirección / Gestión'),
(19, 'Soft Skills (Habilidades Blandas)')
ON CONFLICT (id) DO NOTHING;
