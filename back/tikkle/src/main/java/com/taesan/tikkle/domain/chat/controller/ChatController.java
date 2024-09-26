package com.taesan.tikkle.domain.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import com.taesan.tikkle.domain.chat.entity.ChatMessage;
import com.taesan.tikkle.domain.chat.service.KafkaConsumer;
import com.taesan.tikkle.domain.chat.service.KafkaProducer;

@Controller
public class ChatController {

	@Autowired
	private KafkaProducer kafkaProducer;

	@Autowired
	private KafkaConsumer kafkaConsumer;

	@MessageMapping("/sendMessage")
	public void sendMessage(@Payload ChatMessage chatMessage) {
		kafkaProducer.sendMessage(chatMessage);
	}
}
