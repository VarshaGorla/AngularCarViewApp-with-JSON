## TODO:

- Enhance the UI
- Enhance the filter functionality
- Add goBack functionality from selectedDriver

## How to run the code?

### Prerequisites

The following commands and the start scripts were written for Unix-like operating systems (Linux and macOS). If you're 
using Windows, you might need to change a thing or two. Please let us know if you need help with that or with running 
the code in general. 

Make sure that you have `Node.js` and `npm` installed on your system and that both are available in your path.

### Running the Node.js back end

To start the Node.js back end, you can simply run the `start_node_backend.sh` shell script. Type the following in your
console:

1. `chmod 755 start_node_backend.sh` (this only has to be run once)
2. `./start_node_backend.sh`

This script installs all required packages and starts two servers.

The first server offers the REST API and runs on port 3000. You can retrieve the driver location data using the
following route:  
GET `http://localhost:3000`  
The response is a list of objects containing some information and geographical positions.

The second server serves static files from the `app` directory. To see the `index.html` access the following url:  
`http://localhost:8080`

### Running the Angular front end

If you decide to use the provided angular application, simply run the `start_angular_app.sh` shell script. Type the 
following in your console:

1. `chmod 755 start_angular_app.sh` (this only has to be run once)
2. `./start_angular_app.sh`

The front end can be accessed under the following url:
`http://localhost:4200`

The front end will automatically reloaded if you change something in your code.

This empty angular front end has been generated using the angular-cli. For more infos
see [Angular Tutorial](https://angular.io/tutorial/toh-pt0).
