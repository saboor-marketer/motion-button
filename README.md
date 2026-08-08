# Stateful Motion Button

An accessible animated Send Message button demonstrating intentional transitions between idle, loading, success, and error states. Built with HTML5, CSS3, JavaScript ES6, and Bootstrap 5.

## Overview

This component showcases a stateful button designed for an AI chat UI. The button provides clear visual feedback through intentional motion design while maintaining full accessibility and reduced-motion support.

## States

The button implements a state machine with the following states:

- **Idle**: Normal button state, ready for interaction
- **Hover/Focus**: Subtle lift with shadow when mouse hovers or keyboard focuses
- **Loading**: Spinner animation with "Sending..." label during async operation
- **Success**: Checkmark animation with "Sent" label after successful request
- **Error**: Shake animation with "Retry" label after failed request
- **Disabled**: Button is disabled when no message is entered or during loading

### State Machine Flow

```
             ┌──────────┐
             │   IDLE   │
             └────┬─────┘
                  │ click
                  ↓
             ┌──────────┐
             │ LOADING  │
             └────┬─────┘
               ↙       ↘
          success       error
             ↓             ↓
       ┌─────────┐   ┌──────────┐
       │ SUCCESS │   │  ERROR   │
       └────┬────┘   └────┬─────┘
            │              │
            └──────┬───────┘
                   ↓
                IDLE
```

## Motion Design Decisions

The animation durations and properties were chosen deliberately:

| Transition | Animation | Duration | Rationale |
|------------|-----------|----------|-----------|
| Idle → Hover | translateY + shadow | 180ms | Immediate feedback for hover interaction |
| Idle → Loading | opacity + transform | 200ms | Smooth transition to loading state |
| Loading → Success | scale + opacity | 220ms | Clear perception of state change |
| Loading → Error | opacity + shake | 350ms | Attention-grabbing error feedback |
| Success → Idle | fade/scale | 250ms | Gentle return to ready state |
| Error → Idle | fade | 200ms | Quick reset for retry |

### Property Choices

**Transform and opacity** are primarily used for animation to avoid unnecessary layout changes:

- `transform: translateY(-2px)` for hover lift
- `opacity` for state transitions
- `transform: scale()` for checkmark animation

Layout properties like `width`, `height`, `margin`, and `padding` are avoided in animations to prevent browser reflow.

## Accessibility Features

- **Semantic HTML**: Uses native `<button>` element (not a `<div>`)
- **Keyboard Navigation**: Fully accessible via Tab, Enter, and Space keys
- **Visible Focus State**: Clear outline ring on `:focus-visible`
- **Reduced Motion Support**: Animations disabled when `prefers-reduced-motion` is enabled
- **Loading State Protection**: Button disabled during loading to prevent repeated submissions
- **Disabled State**: Button disabled when no message is present
- **Screen Reader Friendly**: State changes communicated through visual labels

### Reduced Motion

When the operating system's reduced motion preference is enabled:

- All animations are disabled
- State feedback is preserved through color and labels
- Error shake animation is removed, but error color and "Retry" label remain
- Spinner animation is removed, but "Sending..." label is still visible

## Demo Controls

The page includes testing controls to demonstrate success and error states:

- **Force Success**: Triggers a guaranteed successful request
- **Force Error**: Triggers a guaranteed failed request

These controls help verify the button's behavior without relying on random chance.

## Normal Behavior

By default, the button simulates an API request with:

- Random delay between 1-3 seconds
- 80% chance of success
- 20% chance of error

This provides realistic behavior for demonstration purposes.

## File Structure

```
motion-button/
│
├── index.html      # Main HTML structure with Bootstrap layout
├── style.css       # Button styles, animations, and responsive design
├── script.js       # State machine and fake async behavior
└── README.md       # This file
```

## Technology Stack

- **HTML5**: Semantic structure
- **Bootstrap 5**: Page layout and responsive grid
- **CSS3**: Custom button styling and animations
- **JavaScript ES6**: State management and async simulation

## How to Use

1. Open `index.html` in a web browser
2. Type a message in the text area
3. Click the Send button or press Enter
4. Observe the button state transitions
5. Use "Force Success" or "Force Error" buttons to test specific states

## Testing Checklist

- [x] Mouse hover and leave
- [x] Click and repeated clicks
- [x] Tab navigation
- [x] Enter and Space key activation
- [x] Force success trigger
- [x] Force error trigger
- [x] Disabled state (no message)
- [x] Reduced motion mode
- [x] Focus state visibility
- [x] Loading state prevention of double submission

## Browser Compatibility

Works in all modern browsers that support:
- CSS Grid and Flexbox
- CSS Custom Properties
- CSS Transitions and Animations
- ES6 JavaScript features
- `prefers-reduced-motion` media query

## Future Enhancements

Potential improvements for production use:

- Real API integration
- Toast notifications for success/error
- Message history display
- Typing indicator
- Character count
- Auto-resize textarea
- Mobile app integration
