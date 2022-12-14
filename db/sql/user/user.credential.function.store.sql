CREATE OR REPLACE FUNCTION "user".credential_store (
	_id VARCHAR(256),
	_secret VARCHAR(256),
	_identifier VARCHAR(256)
)
RETURNS BOOLEAN AS 
$$
BEGIN
    IF EXISTS(SELECT 1 FROM "user"."credential" WHERE id = _id) THEN
        UPDATE "security".credential
        SET secret = CRYPT(_secret, GEN_SALT('bf'))::VARCHAR(256),
            identifier = _identifier,
            active = TRUE
        WHERE id = _id;
    ELSE
        INSERT INTO "user"."credential" (id, secret, identifier, active)
        VALUES (_id, CRYPT(_secret, GEN_SALT('bf'))::VARCHAR(256), _identifier, TRUE);
    END IF;
    RETURN TRUE;
END
$$ LANGUAGE plpgsql;
