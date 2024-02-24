import cv2
import json

def processInput(jsonObj):
    roomDetails = jsonObj['room_details']['room']
    room = [[roomDetails['coordinates'][0]['x'], roomDetails['coordinates'][0]['y']], [roomDetails['coordinates'][1]['x'], roomDetails['coordinates'][1]['y']]]
    
    furnitureListJson = jsonObj['furniture_details']
    furnitureList = []
    for furniture in  furnitureListJson:
        furnitureList.append([furniture['length'], furniture['width'], furniture['tag']])
        
    return [furnitureList, room]

def processOutput(output, jsonObj):
    furnitureList = []
    for furniture in output:
        coordinate = [
            {
                'x' : furniture[0][0],
                'y' : furniture[0][1]
            },
            {
                'x' : furniture[1][0],
                'y' : furniture[1][1]
            }
        ]
        furnitureJson = {
            'tag' : furniture[2],
            'coordinates' : coordinate
        }
        furnitureList.append(furnitureJson)
    
    jsonObj['furniture_details'] = furnitureList
    return jsonObj

def fitsGood(room,obj):
    
    h=room[1][1]-room[0][1]
    w=room[1][0]-room[0][0]
    h0=obj[0]
    w0=obj[1]
    if max(h0,w0)<=min(h,w):
        return True
    else:
        return False

def fitsBad(room,obj):
    h=room[1][1]-room[0][1]
    w=room[1][0]-room[0][0]
    h0=obj[0]
    w0=obj[1]
    if max(h0,w0)>min(h,w) and max(h0,w0)<=max(h,w) and min(h0,w0)<=min(h,w):
        return True 
    else:
        return False
    
def place(objectCordinates,tooBigObjects,room,Objects):  

    x0=room[0][0]
    y0=room[0][1]
    x1=room[1][0]
    y1=room[1][1]
    
    h=y1-y0
    w=x1-x0

    for i in Objects:
        h0=i[0]
        w0=i[1]
        tag=i[2]
        
        if fitsGood(room,i):
            
            if h>w: #the space is vertical |
                objectCordinates.append([[x0,y0],[x0+w0,y0+h0],i[2]]) #also add the name of the object
                newx0=x0+w0
                newy0=y0
                newx1=x1
                newy1=y0+h0
                
                NEWx0=x0
                NEWy0=y0+h0
                NEWx1=x1
                NEWy1=y1


            elif h<=w: #the space is horizontal _
                objectCordinates.append([[x0,y0],[x0+h0,y0+w0],i[2]]) #also add the name of the object
                newx0=x0
                newy0=y0+w0
                newx1=x0+h0
                newy1=y1
                
                NEWx0=x0+h0
                NEWy0=y0
                NEWx1=x1
                NEWy1=y1
                
            Objects.remove(i)
            place(objectCordinates,tooBigObjects,[[newx0,newy0],[newx1,newy1]],Objects)
            place(objectCordinates,tooBigObjects,[[NEWx0,NEWy0],[NEWx1,NEWy1]],Objects)
                
                

        elif fitsBad(room,i):
            if h>w:#the space is vertical |
                objectCordinates.append([[x0,y0],[x0+h0,y0+w0],i[2]]) #also add the name of the object
                if (x1-(x0+h0))*h>w*(y1-(y0+w0)):
                    newx0=x0
                    newy0=y0+w0
                    newx1=x0+h0
                    newy1=y1
                    
                    NEWx0=x0+h0
                    NEWy0=y0
                    NEWx1=x1
                    NEWy1=y1
                    
                else: 
                    newx0=x0+h0
                    newy0=y0
                    newx1=x1
                    newy1=y0+w0
                    
                    NEWx0=x0
                    NEWy0=y0+w0
                    NEWx1=x1
                    NEWy1=y1


            elif h<=w:#the space is horizontal _
                objectCordinates.append([[x0,y0],[x0+w0,y0+h0],i[2]]) #also add the name of the object
                if (x1-(x0+w0))*h>w*(y1-(y0+h0)):
                    newx0=x0
                    newy0=y0+h0
                    newx1=x0+w0
                    newy1=y1
                    
                    NEWx0=x0+w0
                    NEWy0=y0
                    NEWx1=x1
                    NEWy1=y1
                    
                else:
                    newx0=x0+w0
                    newy0=y0
                    newx1=x1
                    newy1=y0+h0
                    
                    NEWx0=x0
                    NEWy0=y0+h0
                    NEWx1=x1
                    NEWy1=y1

                    
            Objects.remove(i)        
            place(objectCordinates,tooBigObjects,[[newx0,newy0],[newx1,newy1]],Objects)
            place(objectCordinates,tooBigObjects,[[NEWx0,NEWy0],[NEWx1,NEWy1]],Objects)
            
        #Object does not fit (WRONG!! LEAVE IT FOR NOW)
        else:
            tooBigObjects.append(i)
            


        
    if len(Objects)==0:
        return [objectCordinates,tooBigObjects]
        
        
def organize(Objects):
    
    newObjects=[]
    
    for obj in Objects:
        if obj[0]>obj[1]:
            newObjects.append([obj[1],obj[0],obj[2]])
        elif obj[0]<=obj[1]:
            newObjects.append(obj)
    return sorted(newObjects,key=lambda obj: obj[0], reverse=True)

def callPlace(jsonObj):
    input = processInput(jsonObj)
    furnitureList = input[0]
    room = input[1]
    output = place([], [], room, organize(furnitureList))[0]
    processOutput(output, jsonObj)
    
#assume all the furnitures are smaller than the room

# INPUT1 = input[0]
# INPUT2 = input[1]
# print(INPUT1)
# print(INPUT2)
# OUTPUT=place([],[],INPUT2,organize(INPUT1))[0] #[first cordinatation,second cordination,tag]
# print(OUTPUT)
   
# path = '/Users/minhphan/Documents/Documents - Minh’s MacBook Pro/Minh/University/devHack-2024/MasterStud-Repository/main/grid.png'
# image = cv2.imread(path) 
# image = cv2.resize(image, (1000, 520))  
  
# room_start_point = INPUT2[0]
# room_end_point = INPUT2[1]

# color = (255, 0, 0) 
# thickness = 5
# image = cv2.rectangle(image, room_start_point, room_end_point, color, thickness) 
  
# # Displaying the image  
# cv2.imshow('map', image)
# cv2.waitKey()
# # cv2.destroyAllWindows()

# for i in OUTPUT:
#     color = (0, 0, 255) 
#     thickness = 2
#     image = cv2.rectangle(image, i[0],i[1], color, thickness) 
    
#     font = cv2.FONT_HERSHEY_SIMPLEX 
#     org = [int((i[0][0]+i[1][0])/2),int((i[0][1]+i[1][1])/2)]
#     fontScale = 0.5
#     color = (0, 0, 0) 
#     thickness = 1
#     image = cv2.putText(image, i[2], org, font,  
#                    fontScale, color, thickness, cv2.LINE_AA) 
#     cv2.imshow('map', image)
#     cv2.waitKey()
# cv2.destroyAllWindows()   