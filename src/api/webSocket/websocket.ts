import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { localStorageService } from '../../utils/localStorageService';

let stompClient: any = null;
const number = localStorageService.getUser();

const webSocket = (callback: (body: any) => void) => {
  stompClient = new Client({
    brokerURL: `${process.env.REACT_APP_BASE_URL}message/ws`,
    connectHeaders: {},
    reconnectDelay: 500,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    logRawCommunication: false,
    webSocketFactory: () => SockJS(`${process.env.REACT_APP_BASE_URL}message/ws`),
    onConnect: (frame) => {
      console.log('Stomp Connect', frame);
      if (stompClient.connected) {
        stompClient.subscribe(`/user/${number}/messages`, callback);
        stompClient.subscribe(`/user/${number}/messageTemplates`, callback);
      }
    },
    // onDisconnect: (frame) => {
    //   console.log('Stomp Disconnect', frame);
    // },
    // onWebSocketClose: (frame) => {
    //   console.log('Stomp WebSocket Closed', frame);
    // },
    // onWebSocketError: (frame) => {
    //   console.log('Stomp WebSocket Error', frame);
    // },
  });

  stompClient.activate();
  return stompClient;
};

export default webSocket;
