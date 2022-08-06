------------ USERS ------------

-- User a
SELECT "user".identifier_store(
	'00000000-0000-0000-0000-000000000000'::uuid,
	'a@a.com', 
	'Aaaaaa', 
	'Aaaaaa', 
	'a@a.com', 
	'/picture'
);

SELECT "user".credential_store(
	'local.a@a.com',
	'a',
	'a@a.com'
);

-- User b
SELECT "user".identifier_store(
	'10000000-0000-0000-0000-000000000000'::uuid,
	'b@b.com', 
	'Bbbbb', 
	'Bbbbb', 
	'b@b.com', 
	'/picture'
);

SELECT "user".credential_store(
	'local.b@b.com',
	'b',
	'b@b.com'
);

------------ EVENTS ------------

-- Event a
SELECT event.identifier_store(
	'11110000-0000-0000-0000-000000000000'::uuid,
	'00000000-0000-0000-0000-000000000000'::uuid, -- User a
    point(-87.6, 41.9),
	'SUPPORT'::event.category, 
	'WOMEN'::event.league, 
	'description', 
	5,
    (SELECT random_bytea(10))
);

-- User b going to event a
SELECT event.user_store(
	'11110000-0000-0000-0000-000000000000'::uuid,
	'10000000-0000-0000-0000-000000000000'::uuid -- User b
);