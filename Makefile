VERSION = 0.0.2
PACKAGE = github.com/nuxy/go-webview-app-builder
DEBUG   = $(shell echo $(MAKEFLAGS) | grep -q -- "--debug" && echo true || echo false)
LDFLAGS = "-X main.Version=$(VERSION) -X main.DevTools=$(DEBUG)"

ifeq ($(OS), Windows_NT)
    LDFLAGS := "-H windowsgui"
endif

NODE_ENV = $(shell [ $(DEBUG) = true ] || echo "--omit=dev")

run:
	$(MAKE) webview-app-build && go run $(GOFLAGS) -ldflags $(LDFLAGS) ./app.go

build:
	go build -x $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app $(PACKAGE)

build-darwin:
	GOOS=darwin GOARCH=amd64 go build $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app-$(VERSION)-osx-64 $(PACKAGE)

build-linux:
	GOOS=linux GOARCH=amd64 go build $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app-$(VERSION)-linux-64 $(PACKAGE)

build-windows:
	GOOS=windows GOARCH=amd64 go build $(GOFLAGS) -ldflags $(LDFLAGS) -o ./bin/webview-app-$(VERSION)-windows-64.exe $(PACKAGE)

install:
	go install -x $(GOFLAGS) -ldflags $(LDFLAGS) $(PACKAGE)

webview-app-build:
	npm run build --prefix "app/examples/aurelia" $(NODE_ENV)

webview-app-install:
	npm install --prefix "app/examples/aurelia" $(NODE_ENV)
