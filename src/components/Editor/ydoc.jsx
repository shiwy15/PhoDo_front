import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export const ydocs = new Map();

export function getDoc(room){
    if (!ydocs.has(room)) {
        const ydoc = new Doc();
        const wsProvider = new WebsocketProvider(
            'wss://phodo.store/ws',
            room,
            ydoc
        );
        
        wsProvider.on('status', event => {
            console.log(event)
            console.log(event.status)
        })

        ydocs.set(room, { ydoc, nodesMap: ydoc.getMap('nodes'), edgesMap: ydoc.getMap('edges') });
    }

    return ydocs.get(room);
}

// export default getDoc;
