package main

import (
	"api/db"
	"api/endpoints"
	"lib/logger"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	// Create Database connection pool
	err := db.RegisterAccess()
	if err != nil {
		logger.Error.Fatal(err)
		os.Exit(-1)
	}

	// Route endpoints
	router := mux.NewRouter().StrictSlash(true)

	// User endpoints
	userRouter := router.PathPrefix("/user").Subrouter()
	err = endpoints.UserHandlers(userRouter)
	if err != nil {
		logger.Error.Fatal(err)
		os.Exit(-1)
	}

	// Event endpoints
	eventRouter := router.PathPrefix("/event").Subrouter()
	err = endpoints.EventHandlers(eventRouter)
	if err != nil {
		logger.Error.Fatal(err)
		os.Exit(-1)
	}

	// Setup CORS for the API
	credentials := handlers.AllowCredentials()
	methods := handlers.AllowedMethods([]string{"POST"})

	// Start API on port 8080 in its docker container
	logger.Info.Println("Starting API on 8080")
	logger.Error.Fatal(http.ListenAndServe(":8080", handlers.CORS(credentials, methods)(router)))
}
