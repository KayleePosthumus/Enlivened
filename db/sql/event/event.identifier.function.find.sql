CREATE OR REPLACE FUNCTION event.identifier_find(
    _id uuid DEFAULT NULL,
	_organiser uuid DEFAULT NULL,
    _longitude TEXT DEFAULT NULL,
    _latitude TEXT DEFAULT NULL,
    _category event.category DEFAULT NULL,
    _league event.league DEFAULT NULL,
    _description TEXT DEFAULT NULL,
    _capacity INT DEFAULT NULL,
    _picture BYTEA DEFAULT NULL,
    _date_created TIMESTAMP DEFAULT NULL
)
RETURNS TABLE (
    id uuid,
	organiser uuid,
	longitude TEXT,
    latitude TEXT,
	category event.category,
	league event.league,
	description TEXT,
    capacity INT,
    picture BYTEA,
    date_created TIMESTAMP
) AS 
$$
BEGIN
    RETURN QUERY
    SELECT i.id, i.organiser, i.longitude, i.latitude, i.category, i.league, i.description, i.capacity, i.picture, i.date_created
    FROM event.identifier as i
    WHERE (_id IS NULL OR i.id = _id)
    AND (_organiser IS NULL OR i.organiser = _organiser)
    AND (_longitude IS NULL OR i.longitude = _longitude)
    AND (_latitude IS NULL OR i.latitude = _latitude)
    AND (_category IS NULL OR i.category = _category)
    AND (_league IS NULL OR i.league = _league)
    AND (_description IS NULL OR i.description = _description)
    AND (_capacity IS NULL OR i.capacity = _capacity)
    AND (_picture IS NULL OR i.picture = _picture)
    AND (_date_created IS NULL OR i.date_created >= _date_created);
END
$$ LANGUAGE plpgsql;
