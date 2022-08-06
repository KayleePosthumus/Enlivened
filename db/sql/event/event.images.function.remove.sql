CREATE OR REPLACE FUNCTION event.images_remove(
    _id uuid
)
RETURNS TABLE (
    id uuid,
    event_id uuid,
    user_id uuid,
    picture BYTEA,
    date_added TIMESTAMP
) AS 
$$
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM event.images as b
        WHERE b.id = _id
        FOR UPDATE
    ) THEN
        RAISE EXCEPTION 'invalid_image'
            USING HINT = 'Please check the provided image id parameter';
    END IF;

    RETURN QUERY
    DELETE FROM event.images as a WHERE a.id = _id
    RETURNING *;

END
$$ LANGUAGE plpgsql;