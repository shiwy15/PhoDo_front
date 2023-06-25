import { Doc } from 'yjs';
// For this example we use the WebrtcProvider to synchronize the document
// between multiple clients. Other providers are available.
// You can find a list here: https://docs.yjs.dev/ecosystem/connection-provider
// import { WebrtcProvider } from 'y-webrtc';
import { WebsocketProvider } from 'y-websocket';


const ydoc = new Doc();

// new WebrtcProvider('REACTFLOW-COLLAB-EXAMPLE', ydoc, {
//     signaling : ['ws://localhost:3000/newproject']
// });

const wsProvider = new WebsocketProvider(
    // 'ws://13.125.210.252:1234', //🔥 hojun ec2 settin
    'wss://phodo.store/ws', //🔥 jinkyo ec2 setting
    '',
    ydoc
);

wsProvider.on('status', event => {
    console.log(event)
    console.log(event.status)
})

export default ydoc;