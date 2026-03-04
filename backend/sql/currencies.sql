INSERT INTO currencies (id, name, symbol) VALUES
  (1, 'Colones', '₡'),
  (2, 'Dólares', '$')
ON CONFLICT (id) DO NOTHING;