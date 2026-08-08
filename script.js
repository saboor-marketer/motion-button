// State Machine for Send Button
const ButtonState = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};

// DOM Elements
const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const forceSuccessBtn = document.getElementById('forceSuccess');
const forceErrorBtn = document.getElementById('forceError');
const stateDots = document.querySelectorAll('.state-dot');

// Current state
let currentState = ButtonState.IDLE;
let forceResult = null; // 'success' or 'error' for testing

// Initialize
function init() {
    updateButtonState(ButtonState.IDLE);
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Message input - enable/disable button based on content
    messageInput.addEventListener('input', handleInputChange);
    
    // Send button click
    sendButton.addEventListener('click', handleSendClick);
    
    // Force success button
    forceSuccessBtn.addEventListener('click', () => {
        forceResult = 'success';
        messageInput.value = 'Test message for success';
        handleInputChange();
        messageInput.focus();
    });
    
    // Force error button
    forceErrorBtn.addEventListener('click', () => {
        forceResult = 'error';
        messageInput.value = 'Test message for error';
        handleInputChange();
        messageInput.focus();
    });
    
    // Reset force result when user types
    messageInput.addEventListener('keydown', () => {
        if (forceResult) {
            forceResult = null;
        }
    });
}

// Handle input changes
function handleInputChange() {
    const hasMessage = messageInput.value.trim().length > 0;
    sendButton.disabled = !hasMessage || currentState !== ButtonState.IDLE;
}

// Handle send button click
function handleSendClick() {
    if (currentState !== ButtonState.IDLE) return;
    
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Transition to loading state
    updateButtonState(ButtonState.LOADING);
    sendButton.disabled = true;
    
    // Simulate async API request
    simulateApiRequest();
}

// Simulate API request with random delay and result
function simulateApiRequest() {
    // Random delay between 1-3 seconds
    const delay = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
        let result;
        
        // Use forced result if set, otherwise random (80% success, 20% error)
        if (forceResult) {
            result = forceResult;
            forceResult = null; // Reset after use
        } else {
            result = Math.random() < 0.8 ? 'success' : 'error';
        }
        
        if (result === 'success') {
            updateButtonState(ButtonState.SUCCESS);
            
            // Return to idle after success display
            setTimeout(() => {
                if (currentState === ButtonState.SUCCESS) {
                    messageInput.value = '';
                    updateButtonState(ButtonState.IDLE);
                    sendButton.disabled = true;
                }
            }, 1500);
        } else {
            updateButtonState(ButtonState.ERROR);
            sendButton.disabled = false; // Enable retry
        }
    }, delay);
}

// Update button state
function updateButtonState(state) {
    currentState = state;
    sendButton.setAttribute('data-state', state);
    
    // Update state indicator
    stateDots.forEach(dot => {
        if (dot.dataset.state === state) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Handle disabled state based on state
    if (state === ButtonState.IDLE) {
        handleInputChange(); // Check if button should be enabled
    } else if (state === ButtonState.LOADING) {
        sendButton.disabled = true;
    } else if (state === ButtonState.SUCCESS) {
        sendButton.disabled = true;
    } else if (state === ButtonState.ERROR) {
        // Error state allows retry, so enable if there's a message
        handleInputChange();
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
