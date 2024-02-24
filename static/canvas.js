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
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white"
        ctx.fillRect(roomCoordinates[0].x, roomCoordinates[0].y, roomWidth, roomHeight);
        ctx.strokeRect(roomCoordinates[0].x, roomCoordinates[0].y, roomWidth, roomHeight);
        
        // // Draw the furniture
        const furnitureDetails = object.furniture_details;
        furnitureDetails.forEach(furniture => {
        const tag = furniture.tag;
        const coordinates = furniture.coordinates_input;
        const width = coordinates[1].x - coordinates[0].x;
        const height = coordinates[1].y - coordinates[0].y;
        ctx.font = "Arial"
        ctx.strokeStyle = "red";
        ctx.fillStyle = "grey"
        ctx.fillRect(coordinates[0].x, coordinates[0].y, width, height);
        ctx.strokeRect(coordinates[0].x, coordinates[0].y, width, height);
        ctx.strokeText(tag, coordinates[0].x + width/2, coordinates[0].y + height/2);
        });
    }
}

function generateFurnitureCoordinates(object) {
    const furnitureDetails = object.furniture_details;
    var startingX = 10;
    var startingY = 10;
    var margins = 10;
    var counter = 0;
    furnitureDetails.forEach(furniture => {
        furniture.coordinates_input.push({
            "x": startingX + margins,
            "y": startingY 
        })
        var newStartingX = startingX + margins + furniture.width;
        var newStartingY = startingY + furniture.length;
        furniture.coordinates_input.push({
            "x": newStartingX,
            "y": newStartingY
        })
        counter++;
        startingX = newStartingX;
    })
    
    return object;
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
                var furnitureProcessed = generateFurnitureCoordinates(obj);
                draw(furnitureProcessed)
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
                    newObj = JSON.parse(content);
                    for (let i = 0; i < newObj.furniture_details.length; i++) {
                        tagName = newObj.furniture_details[i].tag;
                        for (let j = 0; j < obj.furniture_details.length; j++) {
                            if (obj.furniture_details[j].tag==tagName) {
                                newObj.furniture_details[i].coordinates_input = obj.furniture_details[i].coordinates_input;
                                break;
                            }
                        }
                    }
                    obj = newObj;
                    const ctx = canvas.getContext("2d");
                    const furnitureDetails = obj.furniture_details;
                    const furniture = furnitureDetails[optimizeCount];

                    var coordinates = furniture.coordinates_output;
                    const tag = furniture.tag;
                    const width = coordinates[1].x - coordinates[0].x;
                    const height = coordinates[1].y - coordinates[0].y;

                    ctx.font = "$Arial"
                    ctx.fillStyle = "grey"
                    ctx.fillRect(coordinates[0].x, coordinates[0].y, width, height);
                    ctx.strokeText(tag, coordinates[0].x + width/2, coordinates[0].y + height/2);
                    ctx.strokeRect(coordinates[0].x, coordinates[0].y, width, height);
                    optimizeCount++;

                    //Start a new Path
                    coordinates = furniture.coordinates_input;
                    ctx.beginPath();
                    ctx.moveTo(coordinates[0].x, coordinates[0].y);
                    ctx.lineTo(coordinates[1].x, coordinates[1].y);
                    ctx.stroke();
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

        var coordinates = furniture.coordinates_output;
        const tag = furniture.tag;
        const width = coordinates[1].x - coordinates[0].x;
        const height = coordinates[1].y - coordinates[0].y;

        ctx.font = "$Arial"
        ctx.fillStyle = "grey"
        ctx.fillRect(coordinates[0].x, coordinates[0].y, width, height);
        ctx.strokeText(tag, coordinates[0].x + width/2, coordinates[0].y + height/2);
        ctx.strokeRect(coordinates[0].x, coordinates[0].y, width, height);

        //Start a new Path
        coordinates = furniture.coordinates_input;
        ctx.beginPath();
        ctx.moveTo(coordinates[0].x, coordinates[0].y);
        ctx.lineTo(coordinates[1].x, coordinates[1].y);
        ctx.stroke();
        
        optimizeCount++;
    }
}