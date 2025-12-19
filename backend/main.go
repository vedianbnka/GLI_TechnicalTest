package main

import (
	"log"

	"glitechnicaltest/config"
	"glitechnicaltest/controllers"
	"glitechnicaltest/models"
	"glitechnicaltest/repositories"
	"glitechnicaltest/routes"
	"glitechnicaltest/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	db := config.ConnectDB()
	db.AutoMigrate(&models.ATK{})

	atkRepo := repositories.NewRepository(db)
	atkService := services.NewService(atkRepo)
	atkController := controllers.NewATKController(atkService)

	r := gin.Default()
	r.RedirectTrailingSlash = false
	r.RedirectFixedPath = true
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Content-Type"},
	}))

	routes.SetupRouter(r, atkController)

	r.Run(":8080")
}
