
See issue here: https://github.com/cypress-io/cypress/issues/29095

### Current behavior

# Setup

- Docker Desktop on macOS Sonoma 14.4
- Emulating to platform linux/amd64 in order to use Chrome browser
- Attempted with Node v20 and v21
- Attempted with Electron and Chrome
- This works as expected when --platform=linux/amd64 is removed, but that limits the browser choice to just Electron
 
# `cypress run` fails with 13.6.5 and 13.6.6
When using cypress version 13.6.5 and 13.6.6, executing `cypress run` fails as it just hangs right after announcing it is about to start the test.

`DEBUG: cypress:*` prints this before hanging:
```
cypress:server:run about to run spec {
   "spec":{
      "absolute":"/cypress/cypress/e2e/test.cy.ts",
      "fileExtension":".ts",
      "fileName":"test",
      "name":"test.cy.ts",
      "relative":"cypress/e2e/test.cy.ts"
   },
   "isHeadless":true,
   "browser":{
      "channel":"stable",
      "displayName":"Electron",
      "family":"chromium",
      "majorVersion":118,
      "name":"electron",
      "path":"",
      "version":"118.0.5993.159"
   }
} +32ms
```

The entire debug output of `DEBUG: cypress:*:error` is:
```
  cypress:snapshot:error TypeError [ERR_INVALID_ARG_TYPE]: The "paths[1]" argument must be of type string. Received undefined
  cypress:snapshot:error     at new NodeError (node:internal/errors:405:5)
  cypress:snapshot:error     at validateString (node:internal/validators:162:11)
  cypress:snapshot:error     at Object.resolve (node:path:1097:7)
  cypress:snapshot:error     at Object.resolve (evalmachine.<anonymous>:1:765400)
  cypress:snapshot:error     at resolvePathsAndParent (<embedded>:4511:1077511)
  cypress:snapshot:error     at customRequire (<embedded>:4511:1076567)
  cypress:snapshot:error     at c (<embedded>:2827:111097)
  cypress:snapshot:error     at <embedded>:2827:111632
  cypress:snapshot:error     at <embedded>:4511:18500
  cypress:snapshot:error     at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3) +0ms
  cypress:snapshot:error TypeError [ERR_INVALID_ARG_TYPE]: The "paths[1]" argument must be of type string. Received undefined
  cypress:snapshot:error     at new NodeError (node:internal/errors:405:5)
  cypress:snapshot:error     at validateString (node:internal/validators:162:11)
  cypress:snapshot:error     at Object.resolve (node:path:1097:7)
  cypress:snapshot:error     at Object.resolve (evalmachine.<anonymous>:1:765400)
  cypress:snapshot:error     at resolvePathsAndParent (<embedded>:4511:1077539)
  cypress:snapshot:error     at customRequire (<embedded>:4511:1076567)
  cypress:snapshot:error     at c (<embedded>:2827:111097)
  cypress:snapshot:error     at <embedded>:2827:111632
  cypress:snapshot:error     at <embedded>:4511:18500
  cypress:snapshot:error     at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3) +1ms
```

And it hangs as follows:

![Screenshot 2024-03-08 at 22 17 48](https://github.com/cypress-io/cypress/assets/143029067/a4eca15e-6465-45bb-8e86-fb6e45d4ecaf)


# `cypress run` succeeds with 13.6.4
When using cypress version 13.6.4 with the setup otherwise identical, the test completes as expected except it instead prints this message:
```
[754:0308/191324.311425:ERROR:object_proxy.cc(590)] Failed to call method: org.freedesktop.portal.Settings.Read: object_path= /org/freedesktop/portal/desktop: unknown error type: 
```

### Desired behavior

`cypress run` executes successfully with the latest version, without hanging, and without error messages.

### Test code to reproduce

1. Clone this repo: https://github.com/DI-Studios/cypress-in-docker-hangs-on-mac
2. Start the container from the repo root with `docker compose run --interactive --build --rm cypress`
3. Inside the container run `cypress run`

### Cypress Version

13.6.6

### Node version

v20.11.0

### Operating System

macOS 14.4

### Debug Logs

```shell
See gist: https://gist.github.com/josh-distudios/5640d35efc0b542df0a78706e1ad6f9e
```


### Other

I've had a look at the `cypress:snapshot:error` to see if I can work out where it's coming from, but it appears on 13.6.4 which runs successfully so I'm not sure it's related to this error.

I've also searched the logs for the term "error" which showed that `playwright-webkit` is missing, but when I installed this locally it didn't have resolve the issue.