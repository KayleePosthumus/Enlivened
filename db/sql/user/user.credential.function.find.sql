CREATE OR REPLACE FUNCTION "user".credential_find(
    _id VARCHAR(256) DEFAULT NULL,
	_secret VARCHAR(256) DEFAULT NULL,
    _identifier VARCHAR(256) DEFAULT NULL,
    _type "user".credential_type DEFAULT NULL,
    _active BOOLEAN DEFAULT NULL
)
RETURNS TABLE (
    id VARCHAR(256),
	secret VARCHAR(256),
	identifier VARCHAR(256),
	"type"  "user".credential_type,
	active BOOLEAN
) AS 
$$
BEGIN
    RETURN QUERY
    SELECT i.id, i.secret, i.identifier, i."type", i.active
    FROM "user".credential as i
    WHERE (_id IS NULL OR i.id = _id)
    AND (_secret IS NULL OR CRYPT(_secret, i.secret) = i.secret)
    AND (_identifier IS NULL OR i.identifier = _identifier)
    AND (_type IS NULL OR i."type" = _type)
    AND (_active IS NULL OR i.active = _active);
END
$$ LANGUAGE plpgsql;
