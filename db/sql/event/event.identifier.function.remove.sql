CREATE OR REPLACE FUNCTION event.identifier_remove(
    _id uuid
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

    IF NOT EXISTS (
        SELECT 1
        FROM event.identifier as b
        WHERE b.id = _id
        FOR UPDATE
    ) THEN
        RAISE EXCEPTION 'invalid_event'
            USING HINT = 'Please check the provided event id parameter';
    END IF;

    RETURN QUERY
    DELETE FROM event.identifier as a WHERE a.id = _id
    RETURNING *;

END
$$ LANGUAGE plpgsql;