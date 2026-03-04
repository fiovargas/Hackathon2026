INSERT INTO availability_status (id, name, is_available) VALUES
  (1, 'En búsqueda de empleo', true),
  (2, 'Abierto a oportunidades', true),
  (3, 'No disponible', false),
  (4, 'NA', false)
ON CONFLICT (id) DO NOTHING;


INSERT INTO status_postulations (id, name) VALUES
  (1, 'pendiente'),
  (2, 'leída'),
  (3, 'aceptada'),
  (4, 'rechazada')
ON CONFLICT (id) DO NOTHING;