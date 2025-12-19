package services

import (
	"glitechnicaltest/models"
	"glitechnicaltest/repositories"
	"errors"
)

type ATKService interface {
	GetAll() ([]models.ATK, error)
	GetByID(id string) (models.ATK, error)
	Create(atk models.ATK) (models.ATK, error)
	Update(id string, input map[string]interface{}) (models.ATK, error)
	Delete(id string) error
}

type service struct {
	repo repositories.ATKRepository
}

func NewService(repo repositories.ATKRepository) *service {
	return &service{repo}
}

func (s *service) Create(atk models.ATK) (models.ATK, error) {
	if atk.Qty < 0 {
		return atk, errors.New("qty tidak boleh negatif")
	}
	return s.repo.Create(atk)
}

func (s *service) GetAll() ([]models.ATK, error) {
	return s.repo.FindAll()
}

func (s *service) GetByID(id string) (models.ATK, error) {
	return s.repo.FindByID(id)
}

func (s *service) Update(id string, input map[string]interface{}) (models.ATK, error) {
	atk, err := s.repo.FindByID(id)
	if err != nil {
		return atk, errors.New("data ATK tidak ditemukan")
	}

	if val, ok := input["qty"]; ok {
		qtyFloat, ok := val.(float64)

		if !ok {
			return atk, errors.New("qty harus angka")
		}
		if qtyFloat < 0 {
			return atk, errors.New("qty tidak boleh negatif")
		}
	}

	delete(input, "id")

	err = s.repo.Update(id, input)
	if err != nil {
		return atk, err
	}

	return s.repo.FindByID(id)
}

func (s *service) Delete(id string) error {
	return s.repo.Delete(id)
}