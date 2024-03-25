VERSION = 0.0.1
PACKAGE = github.com/nuxy/go-webview-app-builder
LDFLAGS = "-X main.Version=$(VERSION)"

run:
	go run $(GOFLAGS) -ldflags $(LDFLAGS) ./main.go

build:
	go build -x $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app $(PACKAGE)

build-app:
	npm run build --prefix "app"

install:
	go install -x $(GOFLAGS) -ldflags $(LDFLAGS) $(PACKAGE)

install-app:
	npm install --prefix "app"

buildall:
	GOOS=darwin  GOARCH=amd64 go build $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app-$(VERSION)-osx-64         $(PACKAGE)
	GOOS=linux   GOARCH=amd64 go build $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app-$(VERSION)-linux-64       $(PACKAGE)
	GOOS=windows GOARCH=amd64 go build $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app-$(VERSION)-windows-64.exe $(PACKAGE)
