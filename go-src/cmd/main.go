package main

import (
	"fmt"

	goexif "github.com/dsoprea/go-exif/v3"
	jpegstructure "github.com/dsoprea/go-jpeg-image-structure/v2"
)

func main() {
	fmt.Println("I work!")
	fmt.Println("Trying to parse Exif from JPEG")

	jmp := jpegstructure.NewJpegMediaParser()
	intfc, err := jmp.ParseFile("./src/exif-date/test/test-background.jpg")
	if err != nil {
		panic(err)
	}
	sl := intfc.(*jpegstructure.SegmentList)

	rootIb, err := sl.ConstructExifBuilder()
	if err != nil {
		panic(err)
	}

	ifdPath := "IFD0"

	ifdIb, err := goexif.GetOrCreateIbFromRootIb(rootIb, ifdPath)
}
