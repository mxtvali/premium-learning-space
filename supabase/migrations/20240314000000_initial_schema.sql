
-- Создание таблицы courses
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    author TEXT NOT NULL,
    price DECIMAL NOT NULL,
    image TEXT NOT NULL,
    duration TEXT NOT NULL,
    level TEXT NOT NULL,
    category TEXT NOT NULL,
    rating DECIMAL DEFAULT 0,
    students_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Создание таблицы lessons
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    video_url TEXT NOT NULL,
    order_number INTEGER NOT NULL,
    duration TEXT NOT NULL,
    is_free BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Создание таблицы comments
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Создание таблицы user_progress
CREATE TABLE user_progress (
    user_id UUID NOT NULL,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    last_watched TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (user_id, lesson_id)
);

-- Создание таблицы user_courses
CREATE TABLE user_courses (
    user_id UUID NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    PRIMARY KEY (user_id, course_id)
);

-- Создание RLS политик
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;

-- Политики для courses
CREATE POLICY "Курсы доступны всем для чтения"
ON courses FOR SELECT
TO authenticated, anon
USING (true);

-- Политики для lessons
CREATE POLICY "Уроки доступны аутентифицированным пользователям"
ON lessons FOR SELECT
TO authenticated
USING (
    is_free = true OR
    EXISTS (
        SELECT 1 FROM user_courses
        WHERE user_courses.course_id = lessons.course_id
        AND user_courses.user_id = auth.uid()
    )
);

-- Политики для comments
CREATE POLICY "Комментарии доступны для чтения всем"
ON comments FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Пользователи могут создавать комментарии"
ON comments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Политики для user_progress
CREATE POLICY "Пользователи видят только свой прогресс"
ON user_progress FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Политики для user_courses
CREATE POLICY "Пользователи видят только свои купленные курсы"
ON user_courses FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
