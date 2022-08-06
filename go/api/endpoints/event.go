package endpoints

import (
	"api/data"
	"api/db"
	"fmt"
	"lib/logger"
	"lib/utils"
	"net/http"

	"github.com/gorilla/mux"
)

/////////////////////////////////////////////
// Endpoints

//EventHandlers maintains event endpoints
func EventHandlers(router *mux.Router) error {
	router.HandleFunc("/create", EventIdentifierCreate).Methods("POST")
	router.HandleFunc("/find", EventIdentifierFind).Methods("POST")
	router.HandleFunc("/remove", EventIdentifierRemove).Methods("POST")

	router.HandleFunc("/user/create", EventUserCreate).Methods("POST")
	router.HandleFunc("/user/find", EventUserFind).Methods("POST")
	router.HandleFunc("/user/remove", EventUserRemove).Methods("POST")

	router.HandleFunc("/image/create", EventImageCreate).Methods("POST")
	router.HandleFunc("/image/find", EventImageFind).Methods("POST")
	router.HandleFunc("/image/remove", EventImageRemove).Methods("POST")

	return nil
}

///////////////////////
// Events

// StoreCredential stores a credential
func EventIdentifierCreate(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("EventIdentifierCreate endpoint hit")

	// Unmarshal event
	var eventIdentifier data.EventIdentifier
	err := utils.UnmarshalJSON(writer, request, &eventIdentifier)
	if err != nil {
		fmt.Println(err)
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	// Create a database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	da := data.NewEventDA(access)
	_, err = da.StoreIdentifier(&eventIdentifier)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	// Commit transaction
	err = access.Commit()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	logger.Info.Println("Event Created")
	utils.Ok(writer, request)
}

// EventIdentifierFind gets events
func EventIdentifierFind(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("EventIdentifierFind endpoint hit")

	// Unmarshal event
	var eventIdentifier data.EventIdentifier
	err := utils.UnmarshalJSON(writer, request, &eventIdentifier)
	if err != nil {
		fmt.Println(err)
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	// Create a database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	da := data.NewEventDA(access)
	events, err := da.FindIdentifier(&eventIdentifier)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	// Commit transaction
	err = access.Commit()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	logger.Info.Println("Events Found")
	utils.JSONResponse(writer, request, events)
}

// EventIdentifierRemove removes an event
func EventIdentifierRemove(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("EventIdentifierRemove endpoint hit")

	// Unmarshal event
	var eventIdentifier data.EventIdentifier
	err := utils.UnmarshalJSON(writer, request, &eventIdentifier)
	if err != nil {
		fmt.Println(err)
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	// Create a database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	// Get event information if no event id is specified
	da := data.NewEventDA(access)
	if eventIdentifier.Id == nil {
		temp, err := da.FindIdentifier(&eventIdentifier)
		eventIdentifier = *temp.FindHead()
		if err != nil {
			utils.InternalServerError(writer, request, err)
			return
		}
	}

	err = da.DeleteIdentifier(&eventIdentifier)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	// Commit transaction
	err = access.Commit()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	logger.Info.Println("Event Removed")

	utils.Ok(writer, request)
}

///////////////////////
// Users

// EventUserCreate assigns a user to an event
func EventUserCreate(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("EventUserCreate endpoint hit")

	// Unmarshal Event User
	var eventUser data.EventUser
	err := utils.UnmarshalJSON(writer, request, &eventUser)
	if err != nil {
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	// Create a database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	da := data.NewEventDA(access)
	err = da.StoreEventUser(&eventUser)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	// Commit transaction
	err = access.Commit()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	logger.Info.Println("User Added to Event")

	utils.Ok(writer, request)
}

// EventUserFind gets users for an event
func EventUserFind(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("EventUserFind endpoint hit")

	// Unmarshal Event User
	var eventUser data.EventUser
	err := utils.UnmarshalJSON(writer, request, &eventUser)
	if err != nil {
		fmt.Println(err)
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	// Create a database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	da := data.NewEventDA(access)
	eventUsers, err := da.FindEventUser(&eventUser)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	// Commit transaction
	err = access.Commit()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	logger.Info.Println("Users Succesfully Requested for Event")

	utils.JSONResponse(writer, request, eventUsers)
}

// EventUserRemove removes a user from an event
func EventUserRemove(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("EventUserRemove endpoint hit")

	// Unmarshal Event User
	var eventUser data.EventUser
	err := utils.UnmarshalJSON(writer, request, &eventUser)
	if err != nil {
		fmt.Println(err)
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	// Create a database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	da := data.NewEventDA(access)
	err = da.DeleteEventUser(&eventUser)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	// Commit transaction
	err = access.Commit()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	logger.Info.Println("Users Succesfully Removed from Event")

	utils.Ok(writer, request)
}

///////////////////////
// Images

// EventImageCreate assigns images to an event
func EventImageCreate(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("EventImageCreate endpoint hit")

	// Unmarshal Event Image
	var eventImage data.EventImage
	err := utils.UnmarshalJSON(writer, request, &eventImage)
	if err != nil {
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	// Create a database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	da := data.NewEventDA(access)
	err = da.StoreImage(&eventImage)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	// Commit transaction
	err = access.Commit()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	logger.Info.Println("User Added to Event")

	utils.Ok(writer, request)
}

// EventImageFind gets images for an event
func EventImageFind(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("EventImageFind endpoint hit")

	// Unmarshal Event Image
	var eventImage data.EventImage
	err := utils.UnmarshalJSON(writer, request, &eventImage)
	if err != nil {
		fmt.Println(err)
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	// Create a database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	da := data.NewEventDA(access)
	eventImages, err := da.FindImage(&eventImage)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	// Commit transaction
	err = access.Commit()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	logger.Info.Println("Users Succesfully Requested for Event")

	utils.JSONResponse(writer, request, eventImages)
}

// EventImageRemove removes an image from an event
func EventImageRemove(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("EventImageRemove endpoint hit")

	// Unmarshal Event Image
	var eventImage data.EventImage
	err := utils.UnmarshalJSON(writer, request, &eventImage)
	if err != nil {
		fmt.Println(err)
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	// Create a database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	da := data.NewEventDA(access)
	err = da.DeleteImage(&eventImage)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	// Commit transaction
	err = access.Commit()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	logger.Info.Println("Users Succesfully Removed from Event")

	utils.Ok(writer, request)
}
