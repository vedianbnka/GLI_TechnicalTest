package routes

import (
	"glitechnicaltest/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRouter mengatur semua endpoint API
func SetupRouter(r *gin.Engine, atkController *controllers.AtkController) {

	atkApi := r.Group("/api/atk")
	{
		atkApi.GET("", atkController.GetAll)
		atkApi.GET("/:id", atkController.GetByID)
		atkApi.POST("", atkController.Create)
		atkApi.PUT("/:id", atkController.Update)
		atkApi.DELETE("/:id", atkController.Delete)

	}
}
