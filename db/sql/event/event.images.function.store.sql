CREATE OR REPLACE FUNCTION event.images_store(
	_id uuid, -- NULLABLE, If supplied try update else insert
	_event_id uuid,
	_user_id uuid,
    _picture BYTEA
)
RETURNS uuid AS
$$
DECLARE
	__id uuid;
BEGIN
	IF (_id IS NOT NULL AND EXISTS(SELECT 1 FROM event.images WHERE id = _id)) THEN
        UPDATE event.images
        SET event_id = _event_id,
            user_id = _user_id,
            picture = _picture
        WHERE id = _id
		RETURNING identifier.id INTO __id;
    ELSE
    	INSERT INTO event.images(id, event_id, user_id, picture)
    	VALUES (COALESCE(_id, uuid_generate_v4()), _event_id, _user_id, _picture)
		RETURNING identifier.id INTO __id;
    END IF;
	RETURN __id;
END
$$ LANGUAGE plpgsql;
