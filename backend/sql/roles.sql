INSERT INTO role (id, name) VALUES
(1, 'Administrador'),
(2, 'Aspirante'),
(3, 'Practicante'),
(4, 'Empresa'),
(5, 'Institucion de formacion')
ON CONFLICT (id) DO NOTHING;