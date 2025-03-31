import { useEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

const FADE_OUT_DELAY = 2000;
const TRANSITION_DURATION = 200; // ms
const SWIPE_DISMISS_THRESHOLD = 80; // pixels to drag down to dismiss

interface LetterBoxProps {
  children: JSX.Element;
}

const GitHubLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ display: "block" }}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

export default function Letterbox(
  props: LetterBoxProps,
): JSX.Element {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [modifierKeySymbol, setModifierKeySymbol] = useState("Ctrl");
  const [showKeyboardHint, setShowKeyboardHint] = useState(true); // Default true
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fadeOutTimeoutRef = useRef<number | undefined>();

  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    // Run detection once on mount
    if (typeof navigator !== "undefined") {
      const platform = navigator.platform ?? "";
      const userAgent = navigator.userAgent ?? "";
      const isTouchMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
      setShowKeyboardHint(!isTouchMobile);
      if (/Mac/i.test(platform)) {
        setModifierKeySymbol("⌘");
      } else {
        setModifierKeySymbol("Ctrl");
      }
    }
  }, []);

  const showPopover = () => {
    clearTimeout(fadeOutTimeoutRef.current);
    fadeOutTimeoutRef.current = undefined;
    setIsSubmittedSuccessfully(false);
    setDragOffset(0);
    if (!isPopoverVisible) {
      setIsPopoverVisible(true);
      setMessage("");
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  };

  const closePopover = () => {
    clearTimeout(fadeOutTimeoutRef.current);
    fadeOutTimeoutRef.current = undefined;
    setIsPopoverVisible(false);
    setIsDragging(false);
    setStartY(0);
    setDragOffset(0);
    setTimeout(() => {
      if (!isPopoverVisible) {
        setIsSubmittedSuccessfully(false);
        setComment("");
        setMessage("");
      }
    }, TRANSITION_DURATION);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isPopoverVisible &&
        !isDragging &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        const triggerElement = popoverRef.current.closest(
          ".popover-trigger-wrapper",
        );
        const isClickOnTrigger = triggerElement &&
          triggerElement.contains(event.target as Node);
        if (!isClickOnTrigger) {
          closePopover();
        }
      }
    };
    if (isPopoverVisible) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isPopoverVisible, isDragging]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopover();
      }
    };
    if (isPopoverVisible) {
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isPopoverVisible]);

  useEffect(() => {
    return () => {
      clearTimeout(fadeOutTimeoutRef.current);
    };
  }, []);

  const handleSubmit = async (
    e?: JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e?.preventDefault();
    if (!comment.trim() || isLoading) {
      return;
    }
    setIsLoading(true);
    setMessage("");
    setIsSubmittedSuccessfully(false);
    clearTimeout(fadeOutTimeoutRef.current);
    fadeOutTimeoutRef.current = undefined;
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to save comment.");
      }
      setComment("");
      setIsSubmittedSuccessfully(true);
      fadeOutTimeoutRef.current = setTimeout(() => {
        closePopover();
      }, FADE_OUT_DELAY);
    } catch (error) {
      console.error("Submission error:", error);
      setMessage(error instanceof Error ? error.message : "An error occurred.");
      setIsSubmittedSuccessfully(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) => {
    const isModKeyPressed = /Mac|iPod|iPhone|iPad/.test(navigator.platform)
      ? e.metaKey
      : e.ctrlKey;
    if (
      e.key === "Enter" && isModKeyPressed && !isLoading &&
      comment.trim() !== ""
    ) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTouchStart = (e: JSX.TargetedTouchEvent<HTMLDivElement>) => {
    if (isLoading || isSubmittedSuccessfully) return;
    const target = e.target as HTMLElement;
    if (
      target.closest(
        "textarea, button, a, .popover-form, .popover-github-link",
      )
    ) {
      return;
    }
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setDragOffset(0);
  };

  const handleTouchMove = (e: JSX.TargetedTouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    let offset = currentY - startY;
    offset = Math.max(0, offset);
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setStartY(0);
    if (dragOffset > SWIPE_DISMISS_THRESHOLD) {
      closePopover();
    } else {
      setDragOffset(0);
    }
  };

  const popoverVisibilityClass = isPopoverVisible ? "visible" : "hidden";
  const popoverSuccessClass = isSubmittedSuccessfully ? "success-mode" : "";
  const isButtonDisabled = isLoading || comment.trim() === "";
  const draggingClass = isDragging ? "is-dragging" : "";

  const popoverStyle: JSX.CSSProperties = {};
  if (isDragging) {
    popoverStyle.transform = `translateY(${dragOffset}px)`;
  }

  return (
    <div className="popover-trigger-wrapper" onClick={showPopover}>
      {props.children}

      <style>
        {`
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
            transition: opacity ${TRANSITION_DURATION}ms ease-out, transform ${TRANSITION_DURATION}ms ease-out;
            opacity: 0;
            transform: translateY(10px);
            pointer-events: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 10px;
            touch-action: none;
          }
          .popover-base.is-dragging {
            transition: none;
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
          /* Apply padding and show hint only when hint is active and textarea has content */
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
             text-shadow: 0 0 8px rgba(57, 211, 83, 0.7), 0 0 12px rgba(57, 211, 83, 0.5), 0 0 18px rgba(57, 211, 83, 0.3);
             margin: auto;
             line-height: 1;
             animation: pulse 1.5s infinite ease-in-out;
          }

          @keyframes pulse {
            0% { transform: scale(1); text-shadow: 0 0 8px rgba(57, 211, 83, 0.7), 0 0 12px rgba(57, 211, 83, 0.5), 0 0 18px rgba(57, 211, 83, 0.3); }
            50% { transform: scale(1.08); text-shadow: 0 0 12px rgba(57, 211, 83, 0.9), 0 0 18px rgba(57, 211, 83, 0.7), 0 0 25px rgba(57, 211, 83, 0.5); }
            100% { transform: scale(1); text-shadow: 0 0 8px rgba(57, 211, 83, 0.7), 0 0 12px rgba(57, 211, 83, 0.5), 0 0 18px rgba(57, 211, 83, 0.3); }
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
            }
            .popover-base.visible.is-dragging {
               /* transform is set by inline style */
            }
            .popover-base.visible:not(.is-dragging) {
              transition: opacity ${TRANSITION_DURATION}ms ease-out, transform ${TRANSITION_DURATION}ms ease-out;
              transform: translateY(0);
            }
            .popover-textarea-container {
               /* No specific styles needed */
            }
            .popover-textarea {
              font-size: 1rem;
              min-height: 100px;
              /* Ensure no extra padding on mobile */
              padding-bottom: 10px;
            }
            .popover-submit-button {
              padding: 12px 16px;
              font-size: 1rem;
            }
          }
        `}
      </style>

      <div
        ref={popoverRef}
        className={`popover-base ${popoverVisibilityClass} ${popoverSuccessClass} ${draggingClass}`}
        style={popoverStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isSubmittedSuccessfully
          ? <div className="popover-success-heart">🙏</div>
          : (
            <>
              {/* Add class conditionally for styling */}
              <div
                className={`popover-textarea-container ${
                  showKeyboardHint ? "has-hint" : ""
                }`}
              >
                <textarea
                  ref={textareaRef}
                  id="comment-input"
                  className="popover-textarea"
                  value={comment}
                  onInput={(e) =>
                    setComment((e.target as HTMLTextAreaElement).value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  required
                  maxLength={200}
                  placeholder="Say something&hellip;"
                />
                {/* Conditionally render the hint */}
                {showKeyboardHint && (
                  <span className="popover-inline-hint">
                    {modifierKeySymbol} + ↵
                  </span>
                )}
              </div>

              <div className="popover-bottom-row">
                <a
                  href="https://github.com/seangreen-org/sg-fresh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source code on GitHub"
                  className="popover-github-link"
                >
                  <GitHubLogo />
                </a>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="popover-form"
                >
                  <button
                    type="submit"
                    disabled={isButtonDisabled}
                    className={`popover-submit-button ${
                      isLoading ? "loading" : ""
                    }`}
                    aria-label="Send comment"
                  >
                    {isLoading ? "Sending..." : <SendIcon />}
                  </button>
                </form>
              </div>
              {message && (
                <p
                  className={`popover-status-message ${
                    message.startsWith("Failed") ||
                      message.startsWith("Comment cannot") ||
                      message.startsWith("An error")
                      ? "error"
                      : ""
                  }`}
                >
                  {message}
                </p>
              )}
            </>
          )}
      </div>
    </div>
  );
}
