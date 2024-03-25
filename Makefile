VERSION = 0.0.1
PACKAGE = github.com/nuxy/go-webview-app-builder
LDFLAGS = "-X main.Version=$(VERSION)"

run:
	go run $(GOFLAGS) -ldflags $(LDFLAGS) ./main.go

build:
	go build -x $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app $(PACKAGE)

install:
	go install -x $(GOFLAGS) -ldflags $(LDFLAGS) $(PACKAGE)
