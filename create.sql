CREATE TABLE users (
    user_id SERIAL NOT NULL CONSTRAINT user_pkey PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    age VARCHAR NOT NULL,
    weight VARCHAR NOT NULL,
    height VARCHAR NOT NULL,
    gender VARCHAR NOT NULL,
    bmi DECIMAL NOT NULL,
    points DECIMAL NOT NULL,
    difficulty_selected DECIMAL NOT NULL,
    n_locations_visited DECIMAL
);

--dif recomendada

CREATE TABLE workout_spot (
    location_id SERIAL NOT NULL CONSTRAINT workout_spot_pkey PRIMARY KEY,
    location_name VARCHAR NOT NULL,
    longitude DECIMAL NOT NULL,
    latitude DECIMAL NOT NULL,
    first_time BOOLEAN,
    workout_spot_powerstation_id VARCHAR NOT NULL,
    rating DECIMAL NOT NULL
);

CREATE TABLE powerstation (
    powerstation_id SERIAL NOT NULL CONSTRAINT powerstation_pkey PRIMARY KEY,
    powerstation_type DECIMAL NOT NULL,
    exercises VARCHAR NOT NULL
);

CREATE TABLE exercise (
    exercise_id SERIAL NOT NULL CONSTRAINT exercise_pkey PRIMARY KEY,
    exercise_powerstation_name VARCHAR NOT NULL,
    dificulty DECIMAL NOT NULL,
    muscle_groups_targeted VARCHAR NOT NULL,
    reward DECIMAL NOT NULL
);

CREATE TABLE medals (
    medal_id SERIAL NOT NULL CONSTRAINT medal_pkey PRIMARY KEY,
    points_required DECIMAL NOT NULL,
    captured BOOLEAN NOT NULL
);

-- melhorar ligação de tabelas
-- medalhas na sua propria tabela (?) booleans (?)