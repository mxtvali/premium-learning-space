
-- Создание перечисления для ролей пользователей
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

-- Обновление таблицы пользователей
ALTER TABLE users ADD COLUMN role user_role DEFAULT 'student';
ALTER TABLE users ADD COLUMN full_name TEXT;
ALTER TABLE users ADD COLUMN avatar_url TEXT;

-- Добавление RLS политик для пользователей
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Пользователи могут видеть только свои данные
CREATE POLICY "Users can view their own data"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Админы могут видеть все данные пользователей
CREATE POLICY "Admins can view all user data"
ON users FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role = 'admin'
    )
);

-- Создание индекса для ускорения поиска по роли
CREATE INDEX idx_users_role ON users(role);

