package exif_test

import (
	"testing"

	"github.com/sandman21dan/camera-media-extractor/go-src/internal/exif"
)

func TestSum(t *testing.T) {
	// Arrange
	expected := int32(3)
	actual := exif.Sum(1, 2)

	// Act
	if actual != expected {
		// Assert
		t.Errorf("Expected %d, got %d", expected, actual)
	}
}
