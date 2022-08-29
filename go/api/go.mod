module api

go 1.18

replace lib => ../lib

require (
	github.com/gorilla/handlers v1.5.1
	github.com/gorilla/mux v1.8.0
	github.com/lib/pq v1.10.6
	lib v0.0.0-00010101000000-000000000000
)

require github.com/felixge/httpsnoop v1.0.1 // indirect
