CREATE SCHEMA IF NOT EXISTS event;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE event.category AS ENUM ('SPORT', 'SUPPORT', 'EDUCATION');
CREATE TYPE event.league AS ENUM ('WOMEN', 'MIXED');

CREATE TABLE IF NOT EXISTS event.identifier (
    id uuid DEFAULT uuid_generate_v4(),
    organiser uuid REFERENCES "user".identifier(id) ON DELETE SET NULL,
    longitude TEXT,
    latitude TEXT,
    category event.category DEFAULT 'EDUCATION',
    league event.league DEFAULT 'WOMEN',
    description TEXT,
    capacity INT,
    picture BYTEA,
    date_created TIMESTAMP WITHOUT TIME ZONE DEFAULT(now() AT TIME ZONE 'uct'),
	
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS event.user (
    event_id uuid REFERENCES event.identifier(id) ON DELETE CASCADE,
    user_id uuid REFERENCES "user".identifier(id) ON DELETE CASCADE,

    PRIMARY KEY (event_id, user_id)
);

CREATE TABLE IF NOT EXISTS event.images (
    id uuid DEFAULT uuid_generate_v4(),
    event_id uuid REFERENCES event.identifier(id) ON DELETE CASCADE,
    user_id uuid REFERENCES "user".identifier(id) ON DELETE CASCADE,
    picture BYTEA,
    date_added TIMESTAMP WITHOUT TIME ZONE DEFAULT(now() AT TIME ZONE 'uct'),
	
    PRIMARY KEY (id)
);