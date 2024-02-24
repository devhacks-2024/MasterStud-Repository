function draw(object) {
// function draw() {

    // uncomment the following to test it
    //make sure to remove the object parameter

    // const object = {
    //     "room_details": {
    //       "room": {
    //         "coordinates": [
    //           {"x": 250, "y": 250},
    //           {"x": 500, "y": 500}
    //         ]
    //       },
    //       "window": {
    //         "coordinates": [
    //           {"x": 0, "y": 3},
    //           {"x": 0, "y": 4}
    //         ],
    //         "furniture": "bed"
    //       },
    //       "door": {
    //         "coordinates": [
    //           {"x": 3, "y": 0},
    //           {"x": 4, "y": 0}
    //         ]
    //       },
    //       "socket": {
    //         "coordinates": [
    //           {"x": 5, "y": 2},
    //           {"x": 6, "y": 3}
    //         ],
    //         "furniture": "desk"
    //       }
    //     },
    //     "furniture_details": [
    //       {
    //         "tag": "bed",
    //         "length": 2,
    //         "width": 2,
    //         "coordinates": [
    //           {"x": 250, "y": 250},
    //           {"x": 300, "y": 300}
    //         ]
    //       },
    //       {
    //         "tag": "bed",
    //         "length": 2,
    //         "width": 2,
    //         "coordinates": [
    //           {"x": 350, "y": 350},
    //           {"x": 450, "y": 500}
    //         ]
    //       }
    //     ]
    //   }

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