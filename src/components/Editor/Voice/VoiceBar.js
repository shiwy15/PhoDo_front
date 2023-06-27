import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

//✉️소켓 통신용 import
import io from 'socket.io-client';
import { useUserStore } from '../../store';

const VoiceChat = () => {
  {/*🌿 user에게 전달받은 변수들을 저장하는 useRef, useState*/}
  const socketRef = useRef();
  const peersRef = useRef({});
  const localStreamRef = useRef();
  const controlsRef = useRef();
  // const [members, setMembers] = useState([]);
  const { projectId } = useParams();
  const [userList, setUserList] = useState([]);

  const nickname = useUserStore(state => state.userName) // 주스탄드 스토어...?

{/* 🌿초기 렌더링때 실행되는 hook */}
  useEffect(() => {
    console.log("check render")
    {/*🌿 클라이언트 측에서 Socket.IO를 사용하여 '3001'서버와 클라이언트 소켓 연결을 설정하는 부분 */}
    // socketRef.current = io("wss://phodo.store/vc/", { transports: ['websocket'] });  
    socketRef.current = io("wss://hyeontae.shop/ws");  //socketRef에 현재 

    {/*🌿 연결이 안됐으면, 콘솔창에 에러 띄우기 */}
    socketRef.current.on('connect_error', (err) => {
    console.log(`Connect error due to ${err.message}`);});

    {/*🌿 방 이름 : projectId, 닉네임 : 로컬스토리지에 저장된 userName */}
    joinRoom(projectId, nickname)

    {/*🌿 'accept_join'이벤트를 수신 대기하다가 on되면, 안의 콜백 함수 호출
    users 배열의 각 요소에 대해 반복하며, 각 사용자의 socketId를 사용하여 createPeerConnection 함수를 호출 */}
    socketRef.current.on('accept_join', (users) => {
    setUserList(users);
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

    socketRef.current.on('leave_room', (socketId, nickname, userList) => {
      closePeerConnection(socketId);
      setUserList(userList)
    });

    socketRef.current.on('new_user', (user) => {
      setUserList(prevUserList => {
        if (!prevUserList.some(u => u.nickname === user.nickname)) {
          return [...prevUserList, user];
        } else {
          return prevUserList;
        }
      });
    });
    
    {/*🌿 User끼리 연결해주는 함수*/}
    function createPeerConnection(socketId) {
      console.log('voice 연결 ')
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
          audio.style.display = 'none';
          document.body.appendChild(audio);
      };

      peersRef.current[socketId] = peerConnection;

      localStreamRef.current.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStreamRef.current);
      });

      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socketRef.current.emit('ice', event.candidate, socketId);}
      };

      peerConnection.createOffer()
      .then(offer => {
          return peerConnection.setLocalDescription(offer);})
      .then(() => {
          // const nickname = document.getElementById('nickname').value;
          socketRef.current.emit('offer', peerConnection.localDescription, socketId, nickname);
        }
      );
      console.log('voice 연결 완료 ')
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
      audio.style.display = 'none';
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
    console.log()
    console.log("joinRoom function called with roomName:", roomName, "and nickname:", nickname); // 추가

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(stream => {
      localStreamRef.current = stream;
      const localAudioTrack = stream.getAudioTracks()[0];
      const muteButton = document.createElement('button');
      const muteButtonImage = document.createElement('img');
      muteButtonImage.src = '/onmic.png';

      muteButtonImage.style.width = '17px';
      muteButtonImage.style.height = '17px';

      muteButton.appendChild(muteButtonImage);
      muteButton.onclick = toggleMute
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
      const muteButtonImage = muteButton.querySelector('img'); // assuming you've added an img element inside the button
      muteButtonImage.src = localAudioTrack.enabled ? '/onmic.png' : '/offmic.png';
    }
  };
  

  return (
    <div className='p-4 rounded' style={{ minWidth: '350px', height: '70px' }}>
      <div className="flex items-center">
        
        <div className="flex-none overflow-x-auto p-1 rounded whitespace-nowrap"  style={{ height: '60px', minWidth: '100px' }}>
            <ul id="members" className="m-0 p-0 inline-block" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
              {userList.map((user, index) => (
                <li key={index} className="inline-block mr-2"  style={{marginTop: '10px'}}>
                  <img src="/realTimeUser.png" alt="User icon" style={{ width: '17px', height: '17px', marginLeft : '4px' }} />
                  <p>{user.nickname}</p>
                </li>
              ))}
            </ul>
        </div>
        <div ref={controlsRef} className="flex-none p-1 rounded overflow-x-auto whitespace-nowrap" style={{ height: '32px', minWidth: '120px' }}>
          {/* Mute button will be appended here */}
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;