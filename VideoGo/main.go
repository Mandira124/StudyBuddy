package main 

import (
  "fmt"
  "errors"
  // "io"
  "log"
  "net/http"
  "os"
  "VideoGo/server"
  // "strconv"
  // "time"
  "github.com/rs/cors" 
  // "github.com/gin-goinc/gin"
  // "gitub.com/pion/rtcp"
  // "github.com/pion/webrtc/v3.2.30"

)
    



// type SDP struct {
//   SDP string
// }

func main() {
    
  server.AllRooms.Init()
  mux := http.NewServeMux()
  handler:=cors.Default().Handler(mux)

  mux.HandleFunc("/create",server.CreateRoomHandler)
  mux.HandleFunc("/join",server.JoinRoomHandler)

  err := http.ListenAndServe(":3333",handler)
  fmt.Printf("%T\n",err)
  if errors.Is(err, http.ErrServerClosed) {
    fmt.Printf("server closed\n")
  } else if err != nil {
    log.Fatal(err)
    os.Exit(1)
  }

// func getRoot(w http.ResponseWriter, r *http.Request) {
//   fmt.Printf("got / request\n")
//   io.WriteString(w,"This is my website!\n")
// }
//
// func getHello(w http.ResponseWriter, r *http.Request){
//   fmt.Printf("got /hello request\n")
//   io.WriteString(w, "Hello, HTTP~\n")

}

  // // Establishing Pair PeerConnection
  // // ###############################################
  //
  // // Create a new WebRTC API instance
  //   api := webrtc.NewAPI(webrtc.WithMediaEngine(webrtc.MediaEngine{}))
  //
  //   // Create a new peer connection
  //   peerConnection, err := api.NewPeerConnection(webrtc.Configuration{})
  //   if err != nil {
  //       panic(err)
  //   }
  //
  //   // Handle ICE connection state changes
  //   peerConnection.OnICEConnectionStateChange(func(connectionState webrtc.ICEConnectionState) {
  //       fmt.Printf("ICE Connection State has changed: %s\n", connectionState.String())
  //   })
  //
  //   // Close the peer connection when done
  //   defer func() {
  //       if err := peerConnection.Close(); err != nil {
  //           panic(err)
  //       }
  //   }()
  //
  //   // ############################################################## // }

//
//  
//   router := gin.Default()
//
//   peerConnetionTrack := make(map[string]chan *webrtc.track)
//
//  // Codecs supported by a peer Configuration VP8 
//   m := webrtc.MediaEngine{}
//   m.RegisterCodec(webrtc.NewRTPVP8Codec(webrtc.DefaultPayloadTypeVP, 90000)
//   api := webrtc.NewAPI(webrtc.withMediaEngine(m))
//
//
//   // Signaling server 
//   peerConnetionConfig := webrtc:Configuraioon{
//     ICEServers: []webrtc.ICEServer{
//       {
//        URLS: []string("stun:stun.l.google.com:19302"),  
//       }
//     }
//   }
//
//
//   router.POST("/webrtc/sdp/m/:meetingId/c/:userId/p/:peerId/s/:isSender", func(c* gin.Context) {
//     isSender, _ := strconv.ParseBool(c.Param("isSender"))
//     userId := c.Param("userId")
//     peerId := c.Param("peerId")
//
//           if err :=c.ShouldBindJson(&session); err!=nil 
//       {
//         c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
//         return
//       }
//
//
//     // Create local offer and remote answer for both user 
//     var session SDP
//       offer :=  webrtc.SessionDescription{}
//         Decode(session.Sdp,&offer)
//         peerConnection, err := api.NewPeerConnection(peerConnectionConfig)
//         if err != nil {
//           log.fatal(err)
//         }
//
//
//   
//         }
//
//
//
//
//
//
//
// }
//
//
//
//         func reciveTrack(peerConnection *webrtv.PeerConnection, peerConnectionMap map[string]chan *webrtc.Track), peerId string) {
//           if _, ok := peerConnectionMap[peerID]; !ok {
//             peerConnectionMap[peerId] = make(chan *webrtcc.Track,1)
//
//           }
//           localTrack := <-peerConnectionMap[peerId]
//           peerConection.AddTrack(localTrack)
//         }


      

