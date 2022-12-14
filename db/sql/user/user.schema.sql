CREATE SCHEMA IF NOT EXISTS "user";
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "user".identifier (
    id uuid DEFAULT uuid_generate_v4(),
    identifier VARCHAR(256) UNIQUE NOT NULL,
    first_name VARCHAR(256) CHECK(first_name <> ''),
    last_name VARCHAR(256) CHECK(last_name <> ''),
    email VARCHAR(256) CHECK(email <> ''),
    picture BYTEA CHECK(picture <> ''),
    verified BOOLEAN DEFAULT FALSE,
    female BOOLEAN DEFAULT FALSE,
    date_created TIMESTAMP WITHOUT TIME ZONE DEFAULT(now() AT TIME ZONE 'uct'),
	
    PRIMARY KEY (id)
);

CREATE TYPE "user".credential_type AS ENUM ('federated', 'local');

CREATE TABLE IF NOT EXISTS "user".credential (
    id VARCHAR(256),
    secret VARCHAR(256),
    identifier VARCHAR(256) NOT NULL REFERENCES "user".identifier(identifier) ON DELETE CASCADE,
    "type"  "user".credential_type generated always as (
        CASE
        WHEN secret IS NULL AND id NOT ILIKE 'local.%' THEN 'federated'::"user".credential_type
        ELSE 'local'::"user".credential_type
        END
    ) stored,
    active BOOLEAN NOT NULL,
	
    PRIMARY KEY (id)
);