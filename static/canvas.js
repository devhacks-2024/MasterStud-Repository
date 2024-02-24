var optimizeFlag = true;
var obj;
var optimizeCount = 0;

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
        ctx.strokeStyle = "white";
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
    optimizeFlag = true;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "input/");
    xhr.setRequestHeader("Accept","application/json");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4) {
            if (xhr.status == 200) {
                var content = xhr.responseText;
                obj = JSON.parse(content);
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
    if (optimizeFlag) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "optimize/");
        xhr.setRequestHeader("Accept","application/json");

        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var content = xhr.responseText;
                    obj = JSON.parse(content);
                    const ctx = canvas.getContext("2d");
                    const furnitureDetails = obj.furniture_details;
                    const furniture = furnitureDetails[optimizeCount];

                    const coordinates = furniture.coordinates;
                    const width = coordinates[1].x - coordinates[0].x;
                    const height = coordinates[1].y - coordinates[0].y;
                    ctx.strokeRect(coordinates[0].x, coordinates[0].y, width, height);
                    optimizeCount++;
                }
                else if (xhr.status == 500){
                    alert("The server is in maintenance, please try again later")
                }
            }
        }
        xhr.send();
        optimizeFlag = false;
    }
    else {
        const ctx = canvas.getContext("2d");
        const furnitureDetails = obj.furniture_details;
        const furniture = furnitureDetails[optimizeCount];

        const coordinates = furniture.coordinates;
        const width = coordinates[1].x - coordinates[0].x;
        const height = coordinates[1].y - coordinates[0].y;
        ctx.strokeRect(coordinates[0].x, coordinates[0].y, width, height);
        optimizeCount++;
    }
}