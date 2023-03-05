package com.kjpar0317.batch.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WsMessage {
	private MessageType type;
	private String content;
	private String sender;
}
