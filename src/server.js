const express = require('express'); 
const SocketIO = require("socket.io");
// const http = require("http");

const PORT = 3001;
const app = express(); //socket-http용
const cors = require('cors');
// const httpServer = http.createServer(app); //socket용
// const wsServer = SocketIO(httpServer); //socket용


/* ------------- ---------  socket 코드  ---  -------------------------- */

var fs = require('fs');
var https = require('https');

var options = {
  key:fs.readFileSync('../certificate/key.pem'),
  cert: fs.readFileSync('../certificate/cert.pem')
};

// CORS 옵션 설정
const corsOptions = {
  origin: 'https://phodo.store', // 클라이언트 도메인을 명시적으로 지정하면 보안 상의 이유로 해당 도메인만 요청 허용 가능
  methods: 'GET, POST',
  allowedHeaders:  [
    "Content-Type",
    "Content-Length",
    "Accept-Encoding",
    "X-CSRF-Token",
    "Authorization",
    "accept",
    "origin",
    "Cache-Control",
    "X-Requested-With"
  ],  
  credentials : true
};

app.use(cors(corsOptions))

var server = https.createServer(options, app);
// var io = require('socket.io')(server);

const wsServer = SocketIO(server, {
  cors : corsOptions
}); //socket용



/* ------------- ---------  위는 js 코드  ---  -------------------------- */

/* ------------- ---------  socket 코드  ---  -------------------------- */
// app.set("view engine", "pug"); //브라우저 보여주는 sorce코드 
// app.set("views", process.cwd() + "/src/voice"); //브라우저 보여주는 sorce코드 

// app.use("/public", express.static(process.cwd() + "/src/public"));


// app.get("/*", (req, res) => {
//   res.redirect("/");
// });

let roomObjArr = [
  // {
  //   roomName,
  //   currentNum,
  //   users: [
  //     {
  //       socketId,
  //       nickname,
  //     },
  //   ],
  // },
];
const MAXIMUM = 5;

wsServer.on("connection", (socket) => {
  let myRoomName = null;
  let myNickname = null;

  socket.on("join_room", (roomName, nickname) => {
    myRoomName = roomName;
    myNickname = nickname;

    let isRoomExist = false;
    let targetRoomObj = null;

    // forEach를 사용하지 않는 이유: callback함수를 사용하기 때문에 return이 효용없음.
    for (let i = 0; i < roomObjArr.length; ++i) {
      if (roomObjArr[i].roomName === roomName) {
        // Reject join the room
        if (roomObjArr[i].currentNum >= MAXIMUM) {
          socket.emit("reject_join");
          return;
        }

        isRoomExist = true;
        targetRoomObj = roomObjArr[i];
        break;
      }
    }

    // Create room
    if (!isRoomExist) {
      targetRoomObj = {
        roomName,
        currentNum: 0,
        users: [],
      };
      roomObjArr.push(targetRoomObj);
    }

    //Join the room
    targetRoomObj.users.push({
      socketId: socket.id,
      nickname,
    });
    ++targetRoomObj.currentNum;

    socket.join(roomName);
    socket.emit("accept_join", targetRoomObj.users);

    socket.to(roomName).emit('new_user', { socketId: socket.id, nickname });
  });

  socket.on("offer", (offer, remoteSocketId, localNickname) => {
    socket.to(remoteSocketId).emit("offer", offer, socket.id, localNickname);
  });

  socket.on("answer", (answer, remoteSocketId) => {
    socket.to(remoteSocketId).emit("answer", answer, socket.id);
  });

  socket.on("ice", (ice, remoteSocketId) => {
    socket.to(remoteSocketId).emit("ice", ice, socket.id);
  });

  socket.on("disconnecting", () => {
    socket.to(myRoomName).emit("leave_room", socket.id, myNickname);

    let isRoomEmpty = false;
    for (let i = 0; i < roomObjArr.length; ++i) {
      if (roomObjArr[i].roomName === myRoomName) {
        const newUsers = roomObjArr[i].users.filter(
          (user) => user.socketId != socket.id
        );
        roomObjArr[i].users = newUsers;
        --roomObjArr[i].currentNum;

        if (roomObjArr[i].currentNum == 0) {
          isRoomEmpty = true;
        }
      }
    }

    // Delete room
    if (isRoomEmpty) {
      const newRoomObjArr = roomObjArr.filter(
        (roomObj) => roomObj.currentNum != 0
      );
      roomObjArr = newRoomObjArr;
    }
  });
});

// SERVER LISTEN
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

httpServer.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`)});

