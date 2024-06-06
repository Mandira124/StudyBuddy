package server

import (
  "net/http"
  "log"
  // "github.com/rs/cors"
  // "fmt"
  "time"
  "github.com/gorilla/websocket"
  "sync"
  "math/rand"
  "encoding/json"
  
)


var AllRooms RoomMap  
    
// Create room http handler
func CreateRoomHandler(w http.ResponseWriter,r *http.Request) {

  roomID := AllRooms.CreateRoom()

  type resp struct{
    RoomID string  `json:"room_id"`
  }
  log.Println(AllRooms.Map)
  json.NewEncoder(w).Encode(resp{RoomID: roomID})
}


var upgrader = websocket.Upgrader{
  CheckOrigin: func (r *http.Request) bool  {
    return true
  },

}

type broadcastMsg struct{ 
  Message map[string]interface{}
  RoomID string
  Client *websocket.Conn
}

var broadcast = make(chan broadcastMsg)

func broadcaster() {
  for{
    msg := <-broadcast

    for _, client := range AllRooms.Map[msg.RoomID] {
      if(client.Conn != msg.Client) {
        err := client.Conn.WriteJSON(msg.Message)

        if err != nil {
          log.Fatal(err)
          client.Conn.Close()
        }
      }
    }
  }

}

// JoinRoom Http handler
func JoinRoomHandler(w http.ResponseWriter, r *http.Request) {
  
  roomID, ok := r.URL.Query()["roomID"]
  if !ok{
    log.Println("roomID missing in URL Prameters")
    return
  }

  ws, err := upgrader.Upgrade(w,r,nil)
  if err != nil {
    log.Fatal("websocket upgrade error", err)
 
  }

  AllRooms.InsertIntoRoom(roomID[0], false , ws)

  go broadcaster()

  for {
    var msg broadcastMsg

    err := ws.ReadJSON(&msg.Message)
    if err != nil {
      log.Fatal("Read Error:", err)
    }
    msg.Client = ws 
    msg.RoomID = roomID[0]

    broadcast <- msg

  }

}


// ###############################################################################

// it is single entity in the hashmap
type Participant struct{
  Host bool
  Conn *websocket.Conn
}

// 
type RoomMap struct {
  Mutex sync.RWMutex
  Map map[string][]Participant
}

// Initiatize the map 
func (r *RoomMap) Init() {
  r.Map = make(map[string][]Participant)
}

// return participant array 
func (r *RoomMap) Get(roomID string) []Participant {
  r.Mutex.RLock()
  defer r.Mutex.RUnlock()

  return r.Map[roomID]
}


// Creating hash code as room id 
func (r *RoomMap) CreateRoom() string {
  
  r.Mutex.RLock()
  defer r.Mutex.RUnlock()
  
  rand.Seed(time.Now().UTC().UnixNano())
  var letters = []rune("qwertyuiopasdfghlzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM123456789")
  b := make([]rune,8)

  for i := range b{
  b[i] = letters[rand.Intn(len(letters))]
  }

  roomID := string(b)
  r.Map[roomID] = []Participant{}

  return roomID

}


// Create an participant and insert it into hashmap
func (r *RoomMap) InsertIntoRoom(roomID string, host bool, conn *websocket.Conn){
  r.Mutex.Lock()
  defer r.Mutex.Unlock()

  p := Participant{host, conn}

  log.Println("Inserting into Room with RoomID: ",roomID)
  r.Map[roomID] = append(r.Map[roomID],p)
}

func (r *RoomMap) DeleteRoom(roomID string){
  r.Mutex.Lock()
  defer r.Mutex.Unlock()

  delete(r.Map,roomID)
}

// ############################################################################
