package main

import (
	"api/endpoints"
	"lib/logger"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func main() {
	// Route endpoints
	router := mux.NewRouter().StrictSlash(true)

	// User endpoints
	userRouter := router.PathPrefix("/user").Subrouter()
	err := endpoints.UserHandlers(userRouter)
	if err != nil {
		logger.Error.Fatal(err)
		os.Exit(-1)
	}

	// Start API on port 8080 in its docker container
	logger.Info.Println("Starting API on 8080")
	logger.Error.Fatal(http.ListenAndServe(":8080", router))
}
