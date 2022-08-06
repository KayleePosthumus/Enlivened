CREATE OR REPLACE FUNCTION event.identifier_store(
	_id uuid, -- NULLABLE, If supplied try update else insert
	_organiser uuid,
	_location POINT,
	_category event.category,
	_league event.league,
	_description TEXT,
	_capacity INT,
    _picture BYTEA
)
RETURNS uuid AS
$$
DECLARE
	__id uuid;
BEGIN
	IF (_id IS NOT NULL AND EXISTS(SELECT 1 FROM event.identifier WHERE id = _id)) THEN
        UPDATE event.identifier
        SET organiser = _organiser,
            location = _location,
            category = _category,
            league = _league,
			capacity = _capacity,
			description = _description,
            picture = _picture
        WHERE id = _id
		RETURNING identifier.id INTO __id;
    ELSE
    	INSERT INTO event.identifier(id, organiser, location, category, league, description, capacity, picture)
    	VALUES (COALESCE(_id, uuid_generate_v4()), _organiser, _location, _category, _league, _description, _capacity, _picture)
		RETURNING identifier.id INTO __id;
    END IF;
	RETURN __id;
END
$$ LANGUAGE plpgsql;
