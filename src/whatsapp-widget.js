/*!
 * WhatsApp Widget Chat Box Library
 * Copyright (c) 2025 Hridoy
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * 1. This copyright notice and permission notice shall be included in all copies
 *    or substantial portions of the Software.
 * 2. The Software is provided "as is", without warranty of any kind, express or implied,
 *    including but not limited to the warranties of merchantability, fitness for a
 *    particular purpose, and non-infringement.
 * 3. The author(s) shall not be liable for any claims, damages, or liabilities arising
 *    from the use of the Software.
 *
 * Developed by Hridoy
 * Website: https://hridoy.ttop
 */
class WhatsAppWidget {
    constructor(options = {}) {
        this.options = {
            phoneNumber: '',
            welcomeMessage: 'Hello! How can I help you?',
            companyName: 'WhatsApp Chat',
            agentName: 'Support Agent',
            closedMessage: 'Sorry, we\'re currently offline. We\'ll get back to you soon!',
            customResponse: "Thank you for your message. How can I assist you further? If you'd like to continue this conversation on WhatsApp, please click the button below.",
            position: 'right',
            ...options
        };
        this.isOpen = false;
        this.isMinimized = false;
        this.messageHistory = [];
        this.createWidget();
        this.attachEventListeners();
        this.chatBox.style.display = 'none';
        this.setPosition(this.options.position);
    }

    createWidget() {
        const container = document.getElementById('whatsapp-widget-container');
        container.innerHTML = `
            <div class="whatsapp-widget">
                <div class="whatsapp-icon">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
                </div>
            </div>
            <div class="chat-box" id="chatBox">
                <div class="chat-header">
                    <button class="minimize-btn">_</button>
                    <span>${this.options.companyName}</span>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="chat-messages" id="chatMessages"></div>
                <div class="typing-indicator" id="typingIndicator">${this.options.agentName} is typing...</div>
                <div class="chat-input">
                    <input type="text" id="messageInput" placeholder="Type a message...">
                    <button class="emoji-btn">😊</button>
                    <button class="send-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
                <div class="emoji-picker" id="emojiPicker"></div>
            </div>
        `;
        this.chatBox = document.getElementById('chatBox');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.emojiPicker = document.getElementById('emojiPicker');
    }

    attachEventListeners() {
        const whatsappIcon = document.querySelector('.whatsapp-icon');
        const closeBtn = document.querySelector('.close-btn');
        const minimizeBtn = document.querySelector('.minimize-btn');
        const sendBtn = document.querySelector('.send-btn');
        const emojiBtn = document.querySelector('.emoji-btn');

        whatsappIcon.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        minimizeBtn.addEventListener('click', () => this.minimizeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        emojiBtn.addEventListener('click', () => this.toggleEmojiPicker());
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatBox.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen && this.chatMessages.children.length === 0) {
            this.addMessage(this.options.welcomeMessage, 'received');
        }
    }

    closeChat() {
        this.isOpen = false;
        this.chatBox.classList.remove('active');
        this.chatBox.style.display = 'none';
    }

    minimizeChat() {
        this.isMinimized = !this.isMinimized;
        this.chatBox.classList.toggle('minimized', this.isMinimized);
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (message) {
            this.addMessage(message, 'sent');
            this.messageInput.value = '';
            this.saveMessage(message, 'sent');
            this.simulateResponse();
        }
    }

    addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.textContent = text;
        this.chatMessages.appendChild(messageElement);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

        if (type === 'sent') {
            this.addContactWhatsAppButton();
        }
    }

    simulateResponse() {
        this.typingIndicator.classList.add('active');
        setTimeout(() => {
            this.typingIndicator.classList.remove('active');
            const response = this.options.customResponse;
            this.addMessage(response, 'received');
            this.saveMessage(response, 'received');
        }, Math.random() * 2000 + 1000);
    }

    addContactWhatsAppButton() {
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('contact-whatsapp-btn');
        buttonElement.textContent = 'Contact Us on WhatsApp';
        buttonElement.addEventListener('click', () => this.openWhatsApp());
        this.chatMessages.appendChild(buttonElement);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    openWhatsApp() {
        const phoneNumber = this.options.phoneNumber.replace(/[^0-9]/g, '');
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
    }

    toggleEmojiPicker() {
        this.emojiPicker.classList.toggle('active');
        if (this.emojiPicker.innerHTML === '') {
            const emojis = ['😊', '😂', '🤔', '👍', '❤️', '🎉', '🌟', '🤷‍♂️', '🙏', '👋'];
            emojis.forEach(emoji => {
                const span = document.createElement('span');
                span.textContent = emoji;
                span.onclick = () => this.addEmoji(emoji);
                this.emojiPicker.appendChild(span);
            });
        }
    }

    addEmoji(emoji) {
        this.messageInput.value += emoji;
        this.messageInput.focus();
    }

    saveMessage(message, type) {
        this.messageHistory.push({ message, type, timestamp: new Date() });
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        localStorage.setItem('whatsappChatHistory', JSON.stringify(this.messageHistory));
    }

    loadChatHistory() {
        const history = localStorage.getItem('whatsappChatHistory');
        if (history) {
            this.messageHistory = JSON.parse(history);
            this.messageHistory.forEach(msg => {
                this.addMessage(msg.message, msg.type);
            });
        }
    }

    clearChatHistory() {
        this.messageHistory = [];
        this.chatMessages.innerHTML = '';
        localStorage.removeItem('whatsappChatHistory');
    }

    setAvailabilityStatus(isAvailable) {
        this.isAvailable = isAvailable;
        if (!isAvailable) {
            this.addMessage(this.options.closedMessage, 'received');
        }
    }

    setCustomStyle(styles) {
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    setPosition(position) {
        const widget = document.querySelector('.whatsapp-widget');
        const chatBox = document.querySelector('.chat-box');
        
        if (position === 'left') {
            widget.style.left = '20px';
            widget.style.right = 'auto';
            chatBox.style.left = '20px';
            chatBox.style.right = 'auto';
        } else {
            widget.style.right = '20px';
            widget.style.left = 'auto';
            chatBox.style.right = '20px';
            chatBox.style.left = 'auto';
        }
    }
}

// Modify the default initialization at the bottom of the file
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Check if custom config exists and use it, otherwise use defaults
        const config = window.whatsappWidgetConfig || {
            phoneNumber: '+1234567890',
            welcomeMessage: 'Welcome to our WhatsApp chat! How can we help you today?',
            companyName: 'Acme Inc. Support',
            agentName: 'John Doe',
            closedMessage: 'Sorry, we\'re currently closed. We\'ll get back to you during business hours.'
        };
        
        new WhatsAppWidget(config);
    });
}