package data

import (
	"api/db"
	"database/sql"
	"time"
)

//////////////////////////////////////////////////
// Structures and Variables

// EventIdentifier identifies a Event via common attributes
type EventIdentifier struct {
	Id          *string    `json:"id,omitempty"`
	Organiser   *string    `json:"organiser,omitempty"`
	Location    *string    `json:"location,omitempty"`
	Category    *string    `json:"category,omitempty"`
	League      *string    `json:"league,omitempty"`
	Description *string    `json:"description,omitempty"`
	Capacity    *int       `json:"capacity,omitempty"`
	Picture     *[]byte    `json:"picture,omitempty"`
	DateCreated *time.Time `json:"date_created,omitempty"`
}

// EventIdentifiers represent a splice of EventIdentifier
type EventIdentifiers []*EventIdentifier

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
		&eventIdentifier.Location,
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
