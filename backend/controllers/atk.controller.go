package controllers

import (
	"glitechnicaltest/models"
	"glitechnicaltest/services"
	"net/http"
	"github.com/gin-gonic/gin"
)

type AtkController struct {
	service services.ATKService
}

func NewATKController(service services.ATKService) *AtkController {
	return &AtkController{service}
}

func (h *AtkController) Create(c *gin.Context) {
	var atk models.ATK
	if err := c.ShouldBindJSON(&atk); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	res, err := h.service.Create(atk)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, res)
}

func (h *AtkController) GetAll(c *gin.Context) {
	res, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (h *AtkController) GetByID(c *gin.Context) {
	id := c.Param("id")
	res, err := h.service.GetByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Data tidak ditemukan"})
		return
	}
	c.JSON(http.StatusOK, res)
}

func (h *AtkController) Update(c *gin.Context) {
	id := c.Param("id")
	var input map[string]interface{}

	// Bind JSON ke Map
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format JSON tidak valid"})
		return
	}

	res, err := h.service.Update(id, input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":    res,
	})
}

func (h *AtkController) Delete(c *gin.Context) {
	id := c.Param("id")
	if err := h.service.Delete(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Item berhasil dihapus"})
}