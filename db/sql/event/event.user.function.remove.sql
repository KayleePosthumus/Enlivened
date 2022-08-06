CREATE OR REPLACE FUNCTION event.user_remove(
    _event_id uuid,
    _user_id uuid
)
RETURNS TABLE (
    event_id uuid,
	user_id uuid
) AS 
$$
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM event.user as b
        WHERE b.event_id = _event_id
        AND b.user_id = _user_id
        FOR UPDATE
    ) THEN
        RAISE EXCEPTION 'invalid_event_user'
            USING HINT = 'Please check the provided event and user parameter';
    END IF;

    RETURN QUERY
    DELETE FROM event.user as a
    WHERE a.event_id = _event_id
    AND a.user_id = _user_id
    RETURNING *;

END
$$ LANGUAGE plpgsql;