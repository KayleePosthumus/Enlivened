CREATE OR REPLACE FUNCTION event.images_find(
    _id uuid DEFAULT NULL,
	_event_id uuid DEFAULT NULL,
    _user_id uuid DEFAULT NULL,
    _picture BYTEA DEFAULT NULL,
    _date_added TIMESTAMP DEFAULT NULL
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
    RETURN QUERY
    SELECT i.id, i.event_id, i.user_id, i.picture, i.date_added
    FROM event.images as i
    WHERE (_id IS NULL OR i.id = _id)
    AND (_event_id IS NULL OR i.event_id = _event_id)
    AND (_user_id IS NULL OR i.user_id = _user_id)
    AND (_picture IS NULL OR i.picture = _picture)
    AND (_date_added IS NULL OR i.date_added = _date_added);
END
$$ LANGUAGE plpgsql;
