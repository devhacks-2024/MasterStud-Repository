function draw(object) {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
    
        // Draw the room
        const room = object.room_details.room;
        const roomCoordinates = room.coordinates;
        const roomWidth = roomCoordinates[1].x - roomCoordinates[0].x;
        const roomHeight = roomCoordinates[1].y - roomCoordinates[0].y;

        // const window = object.room_details.window;
        // const windowCoordinates = window.coordinates;
        // const windowAdjacentFurnture = window.furniture;
    
        // const socket = object.room_details.socket;
        // const socketCoordinates = socket.coordinates;
        // const socketAdjacentFurnture = socket.furniture;
    
        // const door = object.room_details.door;
        // const doorCoordinates = door.coordinates;

        ctx.strokeRect(roomCoordinates[0].x, roomCoordinates[0].y, roomWidth, roomHeight);
        
        // // Draw the furniture
        const furnitureDetails = object.furniture_details;
        furnitureDetails.forEach(furniture => {
        const coordinates = furniture.coordinates;
        const width = coordinates[1].x - coordinates[0].x;
        const height = coordinates[1].y - coordinates[0].y;
        ctx.strokeRect(coordinates[0].x, coordinates[0].y, width, height);
        });
    }
}

function getVisualInput() {
    // basic from 
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
    // probably will not work from localhost!
    var xhr = new XMLHttpRequest();
    // We want to get the IP address, but I don't want to talk too much about CORS!
    xhr.open("GET", "input/");
    // hey, we can do this, but don't have to (in this case)
    xhr.setRequestHeader("Accept","application/json");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4) {
            if (xhr.status == 200) {
                var content = xhr.responseText;
                var obj = JSON.parse(content);
                draw(obj)
            }
            else if (xhr.status == 500){
                alert("The server is in maintenance, please try again later")
            }
        }
    }
    xhr.send();
}

function optimize() {
    // basic from 
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
    // probably will not work from localhost!
    var xhr = new XMLHttpRequest();
    // We want to get the IP address, but I don't want to talk too much about CORS!
    xhr.open("GET", "optimize/");
    // hey, we can do this, but don't have to (in this case)
    xhr.setRequestHeader("Accept","application/json");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4) {
            if (xhr.status == 200) {
                var content = xhr.responseText;
                var obj = JSON.parse(content);
                draw(obj)
            }
            else if (xhr.status == 500){
                alert("The server is in maintenance, please try again later")
            }
        }
    }
    xhr.send();
}