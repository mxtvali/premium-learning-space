
-- Добавление токена администратора
INSERT INTO users (id, email, role, full_name)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@example.com',
  'admin',
  'System Administrator'
) ON CONFLICT (id) DO NOTHING;

