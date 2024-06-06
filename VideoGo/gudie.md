# Video Chat building in Go lang 

## Terms and Ideas 

- Signaling, offer and answer 
- nat - network address translation
- Stun server using public IP 
- Track, channel, 
- SDP: information required ; set of info for video chat 
- Signaling : protocal for exchanging information on how and what to communicate
- ICE - Interactive COnnectivity Establishment. protocal to establish connection between two peers
- peerconnection is used by webrtc
- sdp is send through Signaling server/http server/websocket
- 


## Workflow

- 1st client : create offer, local description = offer , send offer, , recive answer, remote descrition = answer, generate and exchange ICE candidate 
- 2nd client :recive offer,, remote description= offer, create answer, local description = Answet, send answer , generate and exchange ICE candidate

1. ICE candidate exchange and generate is done automatically
2. Signaling server; websocket and sdp is used in it. SDP is info of a client device with answer and offer including.
3. Peer connect using ICE candidate share. There is firewall so turn,stun server are used to connect 
4. UDP is more reliable than TCP for videochat.
5. SDP creation and send it through any medium, which is called Signaling
6. set offer and answer as local and remote description and connect two client 

