export const letterboxStyles = `
.popover-trigger-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.popover-base {
  position: fixed;
  bottom: 60px !important;
  right: 20px;
  padding: 15px;
  background: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(80, 80, 80, 0.7);
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  width: 250px;
  min-height: 120px;
  z-index: 50;
  color: #e0e0e0;
  font-size: 0.9rem;
  font-family: Inter, sans-serif;
  transition: opacity 200ms ease-out, transform 200ms ease-out;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.popover-base.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.popover-base.success-mode {
  justify-content: center;
  align-items: center;
}

.popover-textarea-container {
  position: relative;
  width: 100%;
  flex-grow: 1;
  display: flex;
}

.popover-textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #555;
  background: rgba(0, 0, 0, 0.3);
  color: #eee;
  box-sizing: border-box;
  resize: none;
  font-size: 0.9rem;
  font-family: inherit;
  min-height: 60px;
  flex-grow: 1;
  touch-action: pan-y;
}

.popover-inline-hint {
  position: absolute;
  bottom: 8px;
  right: 10px;
  font-size: 0.75rem;
  color: #666;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.popover-textarea:not(:placeholder-shown) + .popover-inline-hint {
  opacity: 1;
}

.popover-textarea-container.has-hint .popover-textarea {
  padding-bottom: 28px;
}

.popover-bottom-row {
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 10px;
  min-height: 24px;
  flex-shrink: 0;
}

.popover-github-link {
  display: inline-block;
  color: #cccccc;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.popover-github-link:hover {
  color: #ffffff;
}

.popover-form {
  margin: 0;
  padding: 0;
  margin-left: auto;
  flex-shrink: 0;
}

.popover-submit-button {
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  background: hsl(210, 75%, 50%);
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.85rem;
  transition: background-color 0.2s ease, transform 0.1s ease, color 0.2s ease;
  transform: scale(1);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 32px;
}

.popover-submit-button:hover:not(:disabled) {
  background: hsl(210, 75%, 55%);
  transform: scale(1.02);
}

.popover-submit-button:disabled {
  background: hsl(210, 15%, 40%);
  color: #aaa;
  cursor: not-allowed;
  transform: scale(1);
}

.popover-submit-button.loading {
  background: #555;
  color: #aaa;
  cursor: wait;
}

.popover-status-message {
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 0.8rem;
  text-align: center;
  color: #cccccc;
  min-height: 1em;
  width: 100%;
  flex-shrink: 0;
}

.popover-status-message.error {
  color: #ff8a8a;
}

.popover-success-heart {
  font-size: 3rem;
  text-align: center;
  color: #39d353;
  text-shadow: 0 0 8px rgba(57, 211, 83, 0.7),
    0 0 12px rgba(57, 211, 83, 0.5), 0 0 18px rgba(57, 211, 83, 0.3);
  margin: auto;
  line-height: 1;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    text-shadow: 0 0 8px rgba(57, 211, 83, 0.7),
      0 0 12px rgba(57, 211, 83, 0.5), 0 0 18px rgba(57, 211, 83, 0.3);
  }
  50% {
    transform: scale(1.08);
    text-shadow: 0 0 12px rgba(57, 211, 83, 0.9),
      0 0 18px rgba(57, 211, 83, 0.7), 0 0 25px rgba(57, 211, 83, 0.5);
  }
  100% {
    transform: scale(1);
    text-shadow: 0 0 8px rgba(57, 211, 83, 0.7),
      0 0 12px rgba(57, 211, 83, 0.5), 0 0 18px rgba(57, 211, 83, 0.3);
  }
}

@media (max-width: 768px) {
  .popover-base {
    left: 10px;
    right: 10px;
    bottom: 50px;
    top: auto;
    width: auto;
    height: auto;
    min-height: 0;
    max-height: 70vh;
    border-radius: 12px;
    padding: 20px;
    font-size: 1rem;
    transform: translateY(calc(100% + 50px));
  }

  .popover-base.visible {
    transform: translateY(0);
    transition: opacity 200ms ease-out, transform 200ms ease-out;
  }

  .popover-textarea {
    font-size: 1rem;
    min-height: 100px;
    padding-bottom: 10px;
  }

  .popover-textarea-container.has-hint .popover-textarea {
    padding-bottom: 28px;
  }

  .popover-submit-button {
    padding: 12px 16px;
    font-size: 1rem;
  }
}
`;
