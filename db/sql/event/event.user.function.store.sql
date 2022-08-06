CREATE OR REPLACE FUNCTION event.user_store(
	_event_id uuid, -- NOT NULLABLE
	_user_id uuid
)
RETURNS BOOLEAN AS
$$
BEGIN
    INSERT INTO event.user(event_id, user_id)
    VALUES (_event_id, _user_id);
	RETURN true;
END
$$ LANGUAGE plpgsql;
