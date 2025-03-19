package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"
)

const (
	loadBalancerURl = "http://learnalb-..."
	totalRequest    = 100
)

func sendRequest(wg *sync.WaitGroup, id int) {
	defer wg.Done()

	resp, err := http.Get(loadBalancerURl)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	fmt.Printf("Request %d: %s\n", id, body)
}

func main() {
	var wg sync.WaitGroup

	for i := 0; i < totalRequest; i++ {
		wg.Add(1)
		go sendRequest(&wg, i)
	}

	wg.Wait()
}
