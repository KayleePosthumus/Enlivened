CREATE OR REPLACE FUNCTION event.user_find(
    _event_id uuid DEFAULT NULL,
	_user_id uuid DEFAULT NULL
)
RETURNS TABLE (
    event_id uuid,
	user_id uuid
) AS 
$$
BEGIN
    RETURN QUERY
    SELECT i.event_id, i.user_id
    FROM event.user as i
    WHERE (_event_id IS NULL OR i.event_id = _event_id)
    AND (_user_id IS NULL OR i.user_id = _user_id);
END
$$ LANGUAGE plpgsql;
