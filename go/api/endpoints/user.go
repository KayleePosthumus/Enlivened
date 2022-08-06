package endpoints

import (
	"api/data"
	"api/db"
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
	router.HandleFunc("/test", TEST).Methods("POST") // TODO [KP]: REMOVE THIS
	router.HandleFunc("/register", UserRegister).Methods("POST")
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
