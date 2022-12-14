package endpoints

import (
	"api/data"
	"api/db"
	"fmt"
	"lib/logger"
	"lib/utils"
	"net/http"
	"regexp"

	"github.com/gorilla/mux"
)

//////////////////////////////////////////////////
// Structures and Variables

var emailRegex = regexp.MustCompile(`^(?:[^@\t\n ])+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]*$`)

type RegisterUserStruct struct {
	FirstName *string `json:"first_name,omitempty"`
	LastName  *string `json:"last_name,omitempty"`
	Email     string  `json:"email"`
	Picture   *[]byte `json:"picture,omitempty"`
	Password  *string `json:"password"`
}

/////////////////////////////////////////////
// Endpoints

//UserHandlers maintains user endpoints
func UserHandlers(router *mux.Router) error {
	router.HandleFunc("/register", UserRegister).Methods("POST")
	router.HandleFunc("/find", FindUser).Methods("POST")
	router.HandleFunc("/login", Login).Methods("POST")

	return nil
}

func TEST(writer http.ResponseWriter, request *http.Request) {
	utils.Ok(writer, request)
}

func UserRegister(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("UserRegister endpoint hit")

	// Unmarshall UserIdentifier
	var registerUserStruct RegisterUserStruct
	err := utils.UnmarshalJSON(writer, request, &registerUserStruct)
	if err != nil {
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	// Validate email
	if !emailRegex.MatchString(registerUserStruct.Email) {
		utils.BadRequest(writer, request, "invalid_email")
		return
	}

	// Create database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	// Check if user already exists
	da := data.NewUserDA(access)
	users, err := da.FindIdentifier(&data.UserIdentifier{Email: &registerUserStruct.Email})
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	user := users.FindHead()
	if user != nil {
		utils.BadRequest(writer, request, "user_already_exists")
		return
	}

	// Create user
	user = &data.UserIdentifier{
		Identifier: &registerUserStruct.Email,
		Email:      &registerUserStruct.Email,
		FirstName:  registerUserStruct.FirstName,
		LastName:   registerUserStruct.LastName,
		Picture:    registerUserStruct.Picture,
	}

	id, err := da.StoreIdentifier(user)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	clientID := "local." + *user.Identifier
	err = da.StoreCredential(clientID, registerUserStruct.Password, *user.Identifier)
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
	logger.Info.Println("User registered")
	utils.JSONResponse(writer, request, id)
}

// FindUser gets images for an event
func FindUser(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("FindUser endpoint hit")

	// Unmarshal Event Image
	var userIdentifier data.UserIdentifier
	err := utils.UnmarshalJSON(writer, request, &userIdentifier)
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

	da := data.NewUserDA(access)
	userIdentifiers, err := da.FindIdentifier(&userIdentifier)
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

	logger.Info.Println("Users Succesfully Requested")

	utils.JSONResponse(writer, request, userIdentifiers)
}

// Login gets images for an event
func Login(writer http.ResponseWriter, request *http.Request) {
	logger.Access.Println("Login endpoint hit")

	// Unmarshal Event Image
	var userCredential data.UserCredential
	err := utils.UnmarshalJSON(writer, request, &userCredential)
	if err != nil {
		fmt.Println(err)
		utils.BadRequest(writer, request, "invalid_request")
		return
	}

	//temp := "local." + *userCredential.Identifier
	//userCredential.Identifier = &temp

	// Create a database connection
	access, err := db.Open()
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}
	defer access.Close()

	da := data.NewUserDA(access)
	userCredent, err := da.FindCredential(&userCredential)
	if err != nil {
		utils.InternalServerError(writer, request, err)
		return
	}

	if len(userCredent) == 0 {
		utils.BadRequest(writer, request, "incorrect_credentials")
		return
	}

	temp := *userCredent[0].Identifier

	logger.Access.Printf("DEBUG:::::::: %v", temp)

	users, err := da.FindIdentifier(&data.UserIdentifier{Email: &temp})
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

	logger.Info.Println("Users Succesfully logged in")

	utils.JSONResponse(writer, request, users[0])
}
