package com.kjpar0317.batch.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjpar0317.batch.model.WsMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebsocketService {

    private static final Map<String, Sinks.Many<String>> sinks = new HashMap<>();

    private final ObjectMapper mapper;

    public void onNext(WsMessage next, String session) {
        if(! sinks.containsKey(session)) return;

        try {
            String payload = mapper.writeValueAsString(next.getContent());
            sinks.get(session).emitNext(payload, Sinks.EmitFailureHandler.FAIL_FAST);
        } catch (JsonProcessingException e) {
            log.error("Unable to send message {} to session {}", next, session, e);
        }
    }

    public Flux<String> getMessages(String session) {
        sinks.putIfAbsent(session, Sinks.many().multicast().onBackpressureBuffer());
        return sinks.get(session).asFlux();
    }
}
