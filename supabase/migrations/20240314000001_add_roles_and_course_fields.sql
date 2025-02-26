
-- Добавление полей для курсов
ALTER TABLE courses
ADD COLUMN prerequisites TEXT[],
ADD COLUMN learning_objectives TEXT[],
ADD COLUMN target_audience TEXT[],
ADD COLUMN teacher_id UUID,
ADD COLUMN published BOOLEAN DEFAULT false,
ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW());

-- Создание таблицы для заявок на курсы
CREATE TABLE course_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Добавление RLS политик для заявок
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- Учащиеся могут видеть только свои заявки
CREATE POLICY "Users can view their own enrollments"
ON course_enrollments FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Учителя могут видеть заявки на свои курсы
CREATE POLICY "Teachers can view enrollments for their courses"
ON course_enrollments FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM courses
        WHERE courses.id = course_enrollments.course_id
        AND courses.teacher_id = auth.uid()
    )
);

-- Админы могут видеть все заявки
CREATE POLICY "Admins can view all enrollments"
ON course_enrollments FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
);

