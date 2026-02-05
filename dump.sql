
INSERT INTO "User" (email, password, is_active, created_at, updated_at)
VALUES
('user1@example.com',  '$2b$10$Z0MT/9dDOJKQG6y.dqSjQejpIN12Au7HQebPAgwE76p1WcPzKZUlC',  true, NOW(), NOW()),
('user2@example.com',  '$2b$10$Z0MT/9dDOJKQG6y.dqSjQejpIN12Au7HQebPAgwE76p1WcPzKZUlC',  true, NOW(), NOW()),
('user3@example.com',  '$2b$10$Z0MT/9dDOJKQG6y.dqSjQejpIN12Au7HQebPAgwE76p1WcPzKZUlC',  true, NOW(), NOW()),
('user4@example.com',  '$2b$10$Z0MT/9dDOJKQG6y.dqSjQejpIN12Au7HQebPAgwE76p1WcPzKZUlC',  true, NOW(), NOW()),
('user5@example.com',  '$2b$10$Z0MT/9dDOJKQG6y.dqSjQejpIN12Au7HQebPAgwE76p1WcPzKZUlC',  true, NOW(), NOW()),
('user6@example.com',  '$2b$10$Z0MT/9dDOJKQG6y.dqSjQejpIN12Au7HQebPAgwE76p1WcPzKZUlC',  true, NOW(), NOW()),
('user7@example.com',  '$2b$10$Z0MT/9dDOJKQG6y.dqSjQejpIN12Au7HQebPAgwE76p1WcPzKZUlC',  true, NOW(), NOW()),
('user8@example.com',  '$2b$10$Z0MT/9dDOJKQG6y.dqSjQejpIN12Au7HQebPAgwE76p1WcPzKZUlC',  true, NOW(), NOW()),
('user9@example.com',  '$2b$10$Z0MT/9dDOJKQG6y.dqSjQejpIN12Au7HQebPAgwE76p1WcPzKZUlC',  true, NOW(), NOW()),
('user10@example.com', '$2b$10$Z0MT/9dDOJKQG6y.dqSjQejpIN12Au7HQebPAgwE76p1WcPzKZUlC', true, NOW(), NOW());

INSERT INTO "Profile" ( name, gender, age, "userId", is_active, created_at, updated_at) SELECT 'Juan Pérez', 'male', 25, u.id, true, NOW(), NOW() FROM "User" u WHERE u.email = 'user1@example.com' ON CONFLICT ("userId") DO NOTHING;
INSERT INTO "Profile" ( name, gender, age, "userId", is_active, created_at, updated_at) SELECT 'Ana Gómez',    'female', 28, 2, true, NOW(), NOW() FROM "User" u WHERE u.email ='user2@example.com' ON CONFLICT ("userId") DO NOTHING;
INSERT INTO "Profile" ( name, gender, age, "userId", is_active, created_at, updated_at) SELECT 'Carlos Ruiz',  'male',   32, 3, true, NOW(), NOW() FROM "User" u WHERE u.email ='user3@example.com' ON CONFLICT ("userId") DO NOTHING;
INSERT INTO "Profile" ( name, gender, age, "userId", is_active, created_at, updated_at) SELECT 'Laura Torres', 'female', 24, 4, true, NOW(), NOW() FROM "User" u WHERE u.email ='user4@example.com' ON CONFLICT ("userId") DO NOTHING;
INSERT INTO "Profile" ( name, gender, age, "userId", is_active, created_at, updated_at) SELECT 'Miguel León',  'male',   35, 5, true, NOW(), NOW() FROM "User" u WHERE u.email ='user5@example.com' ON CONFLICT ("userId") DO NOTHING;
INSERT INTO "Profile" ( name, gender, age, "userId", is_active, created_at, updated_at) SELECT 'Sofía Mora',   'female', 27, 6, true, NOW(), NOW() FROM "User" u WHERE u.email ='user6@example.com' ON CONFLICT ("userId") DO NOTHING;
INSERT INTO "Profile" ( name, gender, age, "userId", is_active, created_at, updated_at) SELECT 'Andrés Vega',  'male',   30, 7, true, NOW(), NOW() FROM "User" u WHERE u.email ='user7@example.com' ON CONFLICT ("userId") DO NOTHING;
INSERT INTO "Profile" ( name, gender, age, "userId", is_active, created_at, updated_at) SELECT 'Paula Ríos',   'female', 22, 8, true, NOW(), NOW() FROM "User" u WHERE u.email ='user8@example.com' ON CONFLICT ("userId") DO NOTHING;
INSERT INTO "Profile" ( name, gender, age, "userId", is_active, created_at, updated_at) SELECT 'Diego Luna',   'male',   29, 9, true, NOW(), NOW() FROM "User" u WHERE u.email ='user9@example.com' ON CONFLICT ("userId") DO NOTHING;
INSERT INTO "Profile" ( name, gender, age, "userId", is_active, created_at, updated_at) SELECT 'María Ortiz',  'female', 31,10, true, NOW(), NOW() FROM "User" u WHERE u.email ='user10@example.com' ON CONFLICT ("userId") DO NOTHING;


INSERT INTO "Publicacion" ( title, content, published, "userId", published_date, created_at ) SELECT 'Primer post', 'Este es un post de prueba con exactamente diez palabras hoy', true, u.id, NOW(), NOW() FROM "User" u WHERE u.email = 'user1@example.com';
INSERT INTO "Publicacion" ( title, content, published, "userId", published_date, created_at ) SELECT 'Segundo post', 'Este es un post de prueba con exactamente diez palabras hoy', true, u.id, NOW(), NOW() FROM "User" u WHERE u.email = 'user2@example.com';
INSERT INTO "Publicacion" ( title, content, published, "userId", published_date, created_at ) SELECT 'Tercer post', 'Este es un post de prueba con exactamente diez palabras hoy', true, u.id, NOW(), NOW() FROM "User" u WHERE u.email = 'user3@example.com';
INSERT INTO "Publicacion" ( title, content, published, "userId", published_date, created_at ) SELECT 'Cuarto post', 'Este es un post de prueba con exactamente diez palabras hoy', true, u.id, NOW(), NOW() FROM "User" u WHERE u.email = 'user4@example.com';
INSERT INTO "Publicacion" ( title, content, published, "userId", published_date, created_at ) SELECT 'Quinto post', 'Este es un post de prueba con exactamente diez palabras hoy', true, u.id, NOW(), NOW() FROM "User" u WHERE u.email = 'user5@example.com';
INSERT INTO "Publicacion" ( title, content, published, "userId", published_date, created_at ) SELECT 'Sexto post', 'Este es un post de prueba con exactamente diez palabras hoy', true, u.id, NOW(), NOW() FROM "User" u WHERE u.email = 'user6@example.com';
INSERT INTO "Publicacion" ( title, content, published, "userId", published_date, created_at ) SELECT 'Septimo post', 'Este es un post de prueba con exactamente diez palabras hoy', true, u.id, NOW(), NOW() FROM "User" u WHERE u.email = 'user7@example.com';
INSERT INTO "Publicacion" ( title, content, published, "userId", published_date, created_at ) SELECT 'Octavo post', 'Este es un post de prueba con exactamente diez palabras hoy', true, u.id, NOW(), NOW() FROM "User" u WHERE u.email = 'user8@example.com';
INSERT INTO "Publicacion" ( title, content, published, "userId", published_date, created_at ) SELECT 'Noveno post', 'Este es un post de prueba con exactamente diez palabras hoy', true, u.id, NOW(), NOW() FROM "User" u WHERE u.email = 'user9@example.com';
INSERT INTO "Publicacion" ( title, content, published, "userId", published_date, created_at ) SELECT 'Decimo post', 'Este es un post de prueba con exactamente diez palabras hoy', true, u.id, NOW(), NOW() FROM "User" u WHERE u.email = 'user10@example.com';

-- Para resetear los registros creados, esto es un truncate asi que ojo elimina todo en la tabla
-- TRUNCATE TABLE "Publicacion", "Profile", "User"
-- RESTART IDENTITY
-- CASCADE;