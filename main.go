package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	file, err := os.Open("./test.bin")
	if err != nil {
		panic(err)
	}

	b, err := io.ReadAll(file)
	if err != nil {
		panic(err)
	}

	fmt.Println(b)
}

type Reader struct {
}
