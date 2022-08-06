package data

import (
	"api/db"
	"database/sql"
	"lib/utils"
	"time"
)

//////////////////////////////////////////////////
// Structures and Variables

// UserIdentifier identifies a User via common attributes
type UserIdentifier struct {
	Id          *string    `json:"id,omitempty"`
	Identifier  *string    `json:"identifier,omitempty"`
	FirstName   *string    `json:"first_name,omitempty"`
	LastName    *string    `json:"last_name,omitempty"`
	Email       *string    `json:"email,omitempty"`
	Picture     *[]byte    `json:"picture,omitempty"`
	Verified    *bool      `json:"verified,omitempty"`
	Female      *bool      `json:"female,omitempty"`
	DateCreated *time.Time `json:"date_created,omitempty"`
}

// UserIdentifiers represent a splice of UserIdentifier
type UserIdentifiers []*UserIdentifier

//FindHead returns the first User
func (users UserIdentifiers) FindHead() *UserIdentifier {
	if len(users) == 0 {
		return nil
	}
	return users[0]
}

// UserCredential identifies a User Event via common attributes
type UserCredential struct {
	Id         *string `json:"id,omitempty"`
	Secret     *string `json:"secret,omitempty"`
	Identifier *string `json:"identifier,omitempty"`
	Type       *string `json:"type,omitempty"`
	Active     *bool   `json:"active,omitempty"`
}

// UserCredentials represent a splice of UserIdentifier
type UserCredentials []*UserCredential

// UserDA provides access to the database for authentication purposes
type UserDA struct {
	access *db.Access
}

// NewUserDA creates a new data access from a underlying shared data access
func NewUserDA(access *db.Access) *UserDA {
	return &UserDA{
		access: access,
	}
}

// Commit commits the current implicit transaction
func (access *UserDA) Commit() error {
	return access.access.Commit()
}

//////////////////////////////////////////////////
// Mappers

func mapUserIdentifier(rows *sql.Rows) (interface{}, error) {
	var userIdentifier UserIdentifier
	err := rows.Scan(
		&userIdentifier.Id,
		&userIdentifier.Identifier,
		&userIdentifier.FirstName,
		&userIdentifier.LastName,
		&userIdentifier.Email,
		&userIdentifier.Picture,
		&userIdentifier.Verified,
		&userIdentifier.Female,
		&userIdentifier.DateCreated,
	)
	if err != nil {
		return nil, err
	}
	return userIdentifier, nil
}

func mapUserCredential(rows *sql.Rows) (interface{}, error) {
	var userCredential UserCredential
	err := rows.Scan(
		&userCredential.Id,
		&userCredential.Secret,
		&userCredential.Identifier,
		&userCredential.Type,
		&userCredential.Active,
	)
	if err != nil {
		return nil, err
	}
	return userCredential, nil
}

//////////////////////////////////////////////////
// Functions

///////////////////////
// User

//StoreIdentifier stores an identifier
func (access *UserDA) StoreIdentifier(identifier *UserIdentifier) (string, error) {
	results, err := access.access.Query(
		`SELECT * FROM "user".identifier_store($1, $2, $3, $4, $5, $6, $7, $8)`, utils.MapString,
		identifier.Id, identifier.Identifier, identifier.FirstName, identifier.LastName, identifier.Email, identifier.Picture, identifier.Verified, identifier.Female)
	if err != nil {
		return "", err
	}
	for r, _ := range results {
		if value, ok := results[r].(string); ok {
			return value, nil
		}
	}
	return "", nil
}

//FindIdentifier finds an identifier
func (access *UserDA) FindIdentifier(identifier *UserIdentifier) (UserIdentifiers, error) {
	results, err := access.access.Query(
		`SELECT * FROM "user".identifier_find($1, $2, $3, $4, $5, $6, $7, $8, $9)`, mapUserIdentifier,
		identifier.Id, identifier.Identifier, identifier.FirstName, identifier.LastName, identifier.Email, identifier.Picture, identifier.Verified, identifier.DateCreated, identifier.Female)
	if err != nil {
		return nil, err
	}
	tmp := make([]*UserIdentifier, 0)
	for r, _ := range results {
		if value, ok := results[r].(UserIdentifier); ok {
			tmp = append(tmp, &value)
		}
	}
	return tmp, nil
}

///////////////////////
// Credential

// StoreCredential stores a credential
func (access *UserDA) StoreCredential(Id string, secret *string, identifier string) error {
	_, err := access.access.Query(`SELECT * FROM "user".credential_store($1, $2, $3)`, nil, Id, secret, identifier)
	if err != nil {
		return err
	}
	return nil
}

//FindCredential finds a user according to Credentials
func (access *UserDA) FindCredential(credential *UserCredential) (UserCredentials, error) {
	results, err := access.access.Query(
		`SELECT * FROM "user".credential_find($1, $2, $3, $4, $5)`, mapUserCredential,
		credential.Id, credential.Secret, credential.Identifier, credential.Type, credential.Active)
	if err != nil {
		return nil, err
	}
	tmp := make([]*UserCredential, 0)
	for r, _ := range results {
		if value, ok := results[r].(UserCredential); ok {
			tmp = append(tmp, &value)
		}
	}
	return tmp, nil
}
