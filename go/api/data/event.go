package data

import (
	"api/db"
	"database/sql"
	"lib/utils"
	"time"
)

//////////////////////////////////////////////////
// Structures and Variables

// EventIdentifier identifies a Event via common attributes
type EventIdentifier struct {
	Id          *string    `json:"id,omitempty"`
	Organiser   *string    `json:"organiser,omitempty"`
	Longitude   *string    `json:"longitude,omitempty"`
	Latitude    *string    `json:"latitude,omitempty"`
	Category    *string    `json:"category,omitempty"`
	League      *string    `json:"league,omitempty"`
	Description *string    `json:"description,omitempty"`
	Capacity    *int       `json:"capacity,omitempty"`
	Picture     *[]byte    `json:"picture,omitempty"`
	DateCreated *time.Time `json:"date_created,omitempty"`
}

// EventIdentifiers represent a splice of EventIdentifier
type EventIdentifiers []*EventIdentifier

//FindHead returns the first User
func (events EventIdentifiers) FindHead() *EventIdentifier {
	if len(events) == 0 {
		return nil
	}
	return events[0]
}

// EventUser identifies a User Event via common attributes
type EventUser struct {
	EventId *string `json:"event_id,omitempty"`
	UserId  *string `json:"user_id,omitempty"`
}

// EventUsers represent a splice of EventUser
type EventUsers []*EventUser

// EventImage identifies a Event via common attributes
type EventImage struct {
	Id        *string    `json:"id,omitempty"`
	EventId   *string    `json:"event_id,omitempty"`
	UserId    *string    `json:"user_id,omitempty"`
	Picture   *[]byte    `json:"picture,omitempty"`
	DateAdded *time.Time `json:"date_added,omitempty"`
}

// EventImages represent a splice of EventImage
type EventImages []*EventImage

// EventDA provides access to the database for authentication purposes
type EventDA struct {
	access *db.Access
}

// NewEventDA creates a new data access from a underlying shared data access
func NewEventDA(access *db.Access) *EventDA {
	return &EventDA{
		access: access,
	}
}

// Commit commits the current implicit transaction
func (access *EventDA) Commit() error {
	return access.access.Commit()
}

//////////////////////////////////////////////////
// Mappers

func mapEventIdentifier(rows *sql.Rows) (interface{}, error) {
	var eventIdentifier EventIdentifier
	err := rows.Scan(
		&eventIdentifier.Id,
		&eventIdentifier.Organiser,
		&eventIdentifier.Longitude,
		&eventIdentifier.Latitude,
		&eventIdentifier.Category,
		&eventIdentifier.League,
		&eventIdentifier.Description,
		&eventIdentifier.Capacity,
		&eventIdentifier.Picture,
		&eventIdentifier.DateCreated,
	)
	if err != nil {
		return nil, err
	}
	return eventIdentifier, nil
}

func mapEventUser(rows *sql.Rows) (interface{}, error) {
	var eventUser EventUser
	err := rows.Scan(
		&eventUser.EventId,
		&eventUser.UserId,
	)
	if err != nil {
		return nil, err
	}
	return eventUser, nil
}

func mapEventImage(rows *sql.Rows) (interface{}, error) {
	var eventImage EventImage
	err := rows.Scan(
		&eventImage.Id,
		&eventImage.EventId,
		&eventImage.UserId,
		&eventImage.Picture,
		&eventImage.DateAdded,
	)
	if err != nil {
		return nil, err
	}
	return eventImage, nil
}

///////////////////////
// Event

//StoreIdentifier stores an identifier
func (access *EventDA) StoreIdentifier(identifier *EventIdentifier) (string, error) {
	results, err := access.access.Query(
		`SELECT * FROM event.identifier_store($1, $2, $3, $4, $5, $6, $7, $8, $9)`, utils.MapString,
		identifier.Id, identifier.Organiser, identifier.Longitude, identifier.Latitude, identifier.Category, identifier.League, identifier.Capacity, identifier.Description, identifier.Picture)
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
func (access *EventDA) FindIdentifier(identifier *EventIdentifier) (EventIdentifiers, error) {
	results, err := access.access.Query(
		`SELECT * FROM event.identifier_find($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, mapEventIdentifier,
		identifier.Id, identifier.Organiser, identifier.Longitude, identifier.Latitude, identifier.Category, identifier.League, identifier.Capacity, identifier.Description, identifier.Picture, identifier.DateCreated)
	if err != nil {
		return nil, err
	}
	tmp := make([]*EventIdentifier, 0)
	for r, _ := range results {
		if value, ok := results[r].(EventIdentifier); ok {
			tmp = append(tmp, &value)
		}
	}
	return tmp, nil
}

//DeleteIdentifier removes an identifier
func (access *EventDA) DeleteIdentifier(identifier *EventIdentifier) error {
	_, err := access.access.Query(
		`SELECT * FROM event.identifier_remove($1)`, nil,
		identifier.Id)
	if err != nil {
		return err
	}
	return nil
}

///////////////////////
// Event-Images

// StoreIdentifier stores an image
func (access *EventDA) StoreImage(identifier *EventImage) error {
	_, err := access.access.Query(
		`SELECT * FROM event.images_store($1, $2, $3, $4)`, nil,
		identifier.Id, identifier.EventId, identifier.UserId, identifier.Picture)
	if err != nil {
		return err
	}
	return nil
}

//FindIdentifier finds an image
func (access *EventDA) FindImage(image *EventImage) (EventImages, error) {
	results, err := access.access.Query(
		`SELECT * FROM event.images_find($1, $2, $3, $4, $5)`, mapEventImage,
		image.Id, image.EventId, image.UserId, image.Picture, image.DateAdded)
	if err != nil {
		return nil, err
	}
	tmp := make([]*EventImage, 0)
	for r, _ := range results {
		if value, ok := results[r].(EventImage); ok {
			tmp = append(tmp, &value)
		}
	}
	return tmp, nil
}

//DeleteImage removes an image from an event
func (access *EventDA) DeleteImage(identifier *EventImage) error {
	_, err := access.access.Query(
		`SELECT * FROM event.image_remove($1)`, nil,
		identifier.Id)
	if err != nil {
		return err
	}
	return nil
}

///////////////////////
// Event-Users

// StoreEventUser stores an image
func (access *EventDA) StoreEventUser(eventUser *EventUser) error {
	_, err := access.access.Query(
		`SELECT * FROM event.user_store($1, $2)`, nil,
		eventUser.EventId, eventUser.UserId)
	if err != nil {
		return err
	}
	return nil
}

//FindIdentifier finds an identifier
func (access *EventDA) FindEventUser(user *EventUser) (EventUsers, error) {
	results, err := access.access.Query(
		`SELECT * FROM event.user_find($1, $2)`, mapEventUser,
		user.EventId, user.UserId)
	if err != nil {
		return nil, err
	}
	tmp := make([]*EventUser, 0)
	for r, _ := range results {
		if value, ok := results[r].(EventUser); ok {
			tmp = append(tmp, &value)
		}
	}
	return tmp, nil
}

//DeleteImage removes an image from an event
func (access *EventDA) DeleteEventUser(identifier *EventUser) error {
	_, err := access.access.Query(
		`SELECT * FROM event.user_remove($1, $2)`, nil,
		identifier.EventId, identifier.UserId)
	if err != nil {
		return err
	}
	return nil
}
