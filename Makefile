VERSION = 0.0.1
PACKAGE = github.com/nuxy/go-webview-app-builder
LDFLAGS = "-X main.Version=$(VERSION)"

ifeq ($(OS), Windows_NT)
    LDFLAGS:="-H windowsgui"
endif

run:
	go run $(GOFLAGS) -ldflags $(LDFLAGS) ./app.go

build:
	go build -x $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app $(PACKAGE)

build-app:
	npm run build --prefix "app" --omit=dev

build-darwin:
	GOOS=darwin GOARCH=amd64 go build $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app-$(VERSION)-osx-64 $(PACKAGE)

build-linux:
	GOOS=linux GOARCH=amd64 go build $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app-$(VERSION)-linux-64 $(PACKAGE)

build-windows:
	GOOS=windows GOARCH=amd64 go build $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app-$(VERSION)-windows-64.exe $(PACKAGE)

install:
	go install -x $(GOFLAGS) -ldflags $(LDFLAGS) $(PACKAGE)

install-app:
	npm install --prefix "app"
