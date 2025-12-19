package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ATK struct {
	ID    string `gorm:"primaryKey;type:varchar(50)" json:"id"`
	Nama  string `gorm:"type:varchar(100);not null" json:"nama" binding:"required"`
	Jenis string `gorm:"type:varchar(50)" json:"jenis" binding:"required"`
	Qty   int    `gorm:"not null" json:"qty" binding:"required"`
}

func (atk *ATK) BeforeCreate(tx *gorm.DB) (err error) {
	atk.ID = uuid.New().String()
	return
}