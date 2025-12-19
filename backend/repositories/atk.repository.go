package repositories

import (
	"glitechnicaltest/models"
	"gorm.io/gorm"
)

type ATKRepository interface {
	FindAll() ([]models.ATK, error)
	FindByID(id string) (models.ATK, error)
	Create(atk models.ATK) (models.ATK, error)
	Update(id string, updates map[string]interface{}) error
	Delete(id string) error
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindAll() ([]models.ATK, error) {
	var atks []models.ATK
	err := r.db.Find(&atks).Error
	return atks, err
}

func (r *repository) FindByID(id string) (models.ATK, error) {
	var atk models.ATK
	err := r.db.First(&atk, "id = ?", id).Error
	return atk, err
}

func (r *repository) Create(atk models.ATK) (models.ATK, error) {
	err := r.db.Create(&atk).Error
	return atk, err
}

func (r *repository) Update(id string, updates map[string]interface{}) error {
	return r.db.Model(&models.ATK{}).Where("id = ?", id).Updates(updates).Error
}

func (r *repository) Delete(id string) error {
	return r.db.Delete(&models.ATK{}, "id = ?", id).Error
}