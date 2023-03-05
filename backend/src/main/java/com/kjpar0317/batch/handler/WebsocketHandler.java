package com.kjpar0317.batch.handler;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjpar0317.batch.model.WsMessage;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class WebsocketHandler implements WebSocketHandler {
	private ObjectMapper ob = new ObjectMapper();
	
    @Override
    public Mono<Void> handle(WebSocketSession session) {
      	Flux<WebSocketMessage> message = session.receive()
                .map(WebSocketMessage::getPayloadAsText)
                .map(this::toMessage)
                .map(m -> session.textMessage(m.getContent()));

        return session.send(message);
    }
    
//    @Override
//    public Mono<Void> handle(WebSocketSession session) {
//    session.receive()
//            .map(WebSocketMessage::getPayloadAsText)
//            .map(this::toMessage)
//            .subscribe(subscriber::onNext, subscriber:: onError, subscriber::onComplete);
//    return session.send(
//            messageRepository.findAll()
//                    .map(this::toJSON)
//                    .map(session::textMessage));
//}
    
    @SuppressWarnings("unused")
	private String toJSON(WsMessage message) {
        try {
            return ob.writeValueAsString(message);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private WsMessage toMessage(String json) {
        try {
            return ob.readValue(json, WsMessage.class);
        } catch (IOException e) {
            throw new RuntimeException("Invalid JSON:" + json, e);
        }
    }
}