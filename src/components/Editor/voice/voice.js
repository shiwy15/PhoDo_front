import io from 'socket.io-client';
import React, { useEffect, useRef, useState } from 'react';

const VoiceChat = () => {
    const socketRef = useRef();
    const peersRef = useRef({});
    const localStreamRef = useRef();
    const controlsRef = useRef();
    const [members, setMembers] = useState([]);

     useEffect(() => {
        
        //🌿 클라이언트 측에서 Socket.IO를 사용하여 '3001'서버와 클라이언트 소켓 연결을 설정하는 부분
        socketRef.current = io("http://localhost:3001", { transports: ['websocket'] });  
        // socketRef.current = io("https://hyeontae.shop", { transports: ['websocket'] });  //socketRef에 현재 

        //🌿 연결이 안됐으면, 콘솔창에 에러 띄우기
        socketRef.current.on('connect_error', (err) => {
        console.log(`Connect error due to ${err.message}`);});
 
        {/*🌿 'accept_join'이벤트를 수신 대기하다가 on되면, 안의 콜백 함수 호출
        setMembers(users): 이 부분은 React의 상태를 업데이트
        users 배열의 각 요소에 대해 반복하며, 각 사용자의 socketId를 사용하여 createPeerConnection 함수를 호출 */}
        socketRef.current.on('accept_join', (users) => {
        setMembers(users);
        users.forEach(user => {
        createPeerConnection(user.socketId);
        });
    });

    socketRef.current.on('offer', (offer, remoteSocketId, localNickname) => {
      handleOffer(remoteSocketId, offer);
    });
  
    socketRef.current.on('answer', (answer, remoteSocketId) => {
      handleAnswer(remoteSocketId, answer);
    });
  
    socketRef.current.on('ice', (ice, remoteSocketId) => {
      handleIceCandidate(remoteSocketId, ice);
    });
  
    socketRef.current.on('leave_room', (socketId, nickname) => {
      closePeerConnection(socketId);
    });

    socketRef.current.on('new_user', (user) => {
        const li = document.createElement('li');
        li.textContent = user.nickname;
        const membersList = document.getElementById('members'); // Assuming 'members' is the id of the ul element
        membersList.appendChild(li);
    });

    function createPeerConnection(socketId) {
        console.log('여기까진됨.')
      const peerConnection = new RTCPeerConnection({
        iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
              ],
            },
          ],
      });

        peerConnection.ontrack = (event) => {
        
            const audio = document.createElement('audio');
            audio.srcObject = event.streams[0];
            audio.controls = true;  // Add this line
            audio.autoplay = true;
            console.log(audio)
            document.body.appendChild(audio);
        };
  
        peersRef.current[socketId] = peerConnection;
  
        localStreamRef.current.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStreamRef.current);
        });
  
      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socketRef.current.emit('ice', event.candidate, socketId);
        }
      };
  
    peerConnection.createOffer()
        .then(offer => {
            return peerConnection.setLocalDescription(offer);
        })
        .then(() => {
            const nickname = document.getElementById('nickname').value;
            socketRef.current.emit('offer', peerConnection.localDescription, socketId, nickname);
        });
    }

    function handleOffer(socketId, offer) {
      const peerConnection = new RTCPeerConnection({
        iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
              ],
            },
          ],
      });

        peerConnection.ontrack = (event) => {
            const audio = document.createElement('audio');
            audio.srcObject = event.streams[0];
            audio.controls = true;  // Add this line
            audio.autoplay = true;
            document.body.appendChild(audio);
        };
  
        peersRef.current[socketId] = peerConnection;
  
        localStreamRef.current.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStreamRef.current);
        });
  
        peerConnection.onicecandidate = event => {
            if (event.candidate) {
            socketRef.current.emit('ice', event.candidate, socketId);
        }
    };
  
      peerConnection.setRemoteDescription(offer)
        .then(() => {
          return peerConnection.createAnswer();
        })
        .then(answer => {
          return peerConnection.setLocalDescription(answer);
        })
        .then(() => {
          socketRef.current.emit('answer', peerConnection.localDescription, socketId);
        });
    }

    function handleAnswer(socketId, answer) {
      const peerConnection = peersRef.current[socketId];
      peerConnection.setRemoteDescription(answer);
    }
  
    function handleIceCandidate(socketId, iceCandidate) {
      const peerConnection = peersRef.current[socketId];
      peerConnection.addIceCandidate(iceCandidate);
    }
  
    function closePeerConnection(socketId) {
      const peerConnection = peersRef.current[socketId];
      peerConnection.close();
      delete peersRef.current[socketId];
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

    const joinRoom = (roomName, nickname) => {
        console.log("joinRoom function called with roomName:", roomName, "and nickname:", nickname); // 추가

        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => {
            localStreamRef.current = stream;
            const localAudioTrack = stream.getAudioTracks()[0];
            const muteButton = document.createElement('button');
            muteButton.textContent = 'Mute';
            muteButton.onclick = toggleMute;
            controlsRef.current.appendChild(muteButton);
      
            socketRef.current.emit('join_room', roomName, nickname);
        })
        .catch(error => {
            console.error('Error accessing audio: ', error);
        });
    };

    const toggleMute = () => {
        const localAudioTrack = localStreamRef.current.getAudioTracks()[0];
        if (localAudioTrack) {
        localAudioTrack.enabled = !localAudioTrack.enabled;
        const muteButton = controlsRef.current.querySelector('button');
        muteButton.textContent = localAudioTrack.enabled ? 'Mute' : 'Unmute';
        }
    };

    return (
        <div>
          <div class="relative mb-3" data-te-input-wrapper-init>
            <input id="room_id" type="text" placeholder="Enter room name" class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"/>
            <label
              for="exampleFormControlInput1"
              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >input room_id
            </label>
          </div>
            <input id="nickname" type="text" placeholder="Enter your nickname" />
            <div ref={controlsRef}></div>
            <button id="join" onClick={() => joinRoom(document.getElementById('room').value, document.getElementById('nickname').value)}>
                Join Room
            </button>
            <ul id="members">
                {members.map((member, index) => (
                    <li key={index}>{member.nickname}</li>
                ))}
            </ul>
        </div>
    );
};

export default VoiceChat;
