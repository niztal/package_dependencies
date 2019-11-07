# package_dependencies

This module represents an express.js server which gets as an input npm module name and returns its list of dependencies

- Module has been written in ES6, compiled with the help of *babel*
- Module has been written in *eslint* linting

first intall package via:
`npm install`

later in order to run this package, enter command:
`npm run`

After running server will run on port *5000*
You will be able to run following APIs:

- Get dependecies:
`GET http://localhost:5000/dependencies?package=express`
*Second run will retrieve dependecies from cache -> after 100seconds cache will get invalidated*

- Get dependecies for specific version:
`http://localhost:5000/dependencies?package=express&&version=4.17.1`
*Second run will retrieve dependecies from cache -> after 100seconds cache will get invalidated*

## Error Handling

- `GET http://localhost:5000/dependencies` -> no package given -> ERROR 404 will get respond
- `GET http://localhost:5000/dependencies?package=express&&version=4.17.2` -> package with specific version doesn't exist -> ERROR 404 will get respond
- `GET http://localhost:5000/dependencies?package=nonExistingPackage` -> package doesn't exist on npm -> ERROR 404 will get response

to run tests run:
`npm test`

You should see this:

- √ respond Not-Found error when getting non-existing package (38ms)
- √ respond Bad Request when not getting package
- √ respond dependencies for latest version
- √ cache dependencies for latest version

## Assumptions

- Caching TTL (Time-to-live) configured 'hard-coded' to be 100 seconds
- Following the above, we assume package's dependencies won't change within 100 seconds
- npm service is online

## Future work

- CI/CD
- Configurable file to enable config TTL, package's dependencies 3rd party (e.g. Yarn) etc.
- Authorization middleware to enable service only for authorized user
- Login service
