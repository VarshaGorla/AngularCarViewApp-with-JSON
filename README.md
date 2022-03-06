# Kinexon Coding Challenge

## What is this about?

This challenge is part of the Kinexon interview process for frontend developers. It gives you the opportunity to show
us your skills, interests, motivation and how you work in general.

## What is included?

### Back end

We provide a backend written in Node.js. It serves a REST API containing data about some fictional car drivers. 
The driver data includes a position (latitude, longitude) which is updated randomly every 5s.

The backend is not particularly well-written because it was originally part of a different challenge destined for 
backend developers. So please don't worry, our production code doesn't look like this :)


### Front end

On the front end side, we provide the scaffold of an empty but operational Angular application (in the `angular-app` 
directory). You can either choose to use it and get started right away or build a front end from scratch using the 
technologies you enjoy. For that you can use the `app` directory. The index.html file contained in it is served by the 
provided backend.   
Whether you use the Angular application or not, has no effect on the way 
we appraise your code.

In terms of content and features, you can build whatever you want as long as you use the data from the API. Get creative 
and have fun. It is not expected that you build a lot of stuff and that everything is 100% polished. Simply try to give 
us a glimpse of what we can expect from you.

## How long should it take?
The task is not time-boxed. You can invest as much time as you want and need to. Most candidates spend something between 
two hours and one day depending on what they build.

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