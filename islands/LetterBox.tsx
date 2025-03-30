// vibe code component 😋
import { useEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

let hideTimeout: number | undefined;
const FADE_OUT_DELAY = 2000;
const TRANSITION_DURATION = 200;

interface CommentPopoverTriggerProps {
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

export default function CommentPopoverTrigger(
  props: CommentPopoverTriggerProps,
): JSX.Element {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [modifierKeySymbol, setModifierKeySymbol] = useState("Ctrl");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fadeOutTimeoutRef = useRef<number | undefined>();

  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform)
    ) {
      setModifierKeySymbol("⌘");
    } else {
      setModifierKeySymbol("Ctrl");
    }
  }, []);

  useEffect(() => {
    if (isPopoverVisible && !isSubmittedSuccessfully && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [isPopoverVisible, isSubmittedSuccessfully]);

  const closePopover = () => {
    clearTimeout(fadeOutTimeoutRef.current);
    fadeOutTimeoutRef.current = undefined;
    clearTimeout(hideTimeout);
    hideTimeout = undefined;
    setIsPopoverVisible(false);
    setTimeout(() => {
      if (!isPopoverVisible) {
        setIsSubmittedSuccessfully(false);
      }
    }, TRANSITION_DURATION);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isPopoverVisible &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        const triggerElement = popoverRef.current.previousElementSibling;
        if (
          triggerElement && !triggerElement.contains(event.target as Node)
        ) {
          closePopover();
        }
      }
    };
    if (isPopoverVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverVisible]);

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
      clearTimeout(hideTimeout);
      clearTimeout(fadeOutTimeoutRef.current);
    };
  }, []);

  const showPopover = () => {
    clearTimeout(hideTimeout);
    clearTimeout(fadeOutTimeoutRef.current);
    fadeOutTimeoutRef.current = undefined;
    setIsSubmittedSuccessfully(false);
    if (!isPopoverVisible) {
      setIsPopoverVisible(true);
      setMessage("");
    }
  };

  const startHideTimer = () => {
    clearTimeout(hideTimeout);
    if (isSubmittedSuccessfully || fadeOutTimeoutRef.current) {
      return;
    }
    if (comment.trim() === "") {
      hideTimeout = setTimeout(() => {
        closePopover();
        setComment("");
      }, 300);
    }
  };

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

  const popoverBaseStyle: JSX.CSSProperties = {
    position: "fixed",
    bottom: "55px",
    right: "20px",
    padding: "15px",
    background: "rgba(30, 30, 30, 0.85)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    border: "1px solid rgba(80, 80, 80, 0.7)",
    borderRadius: "8px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.5)",
    width: "250px",
    minHeight: "120px",
    zIndex: 50,
    color: "#e0e0e0",
    fontSize: "0.9rem",
    fontFamily: "Inter, sans-serif",
    transition:
      `opacity ${TRANSITION_DURATION}ms ease-out, transform ${TRANSITION_DURATION}ms ease-out`,
    opacity: isPopoverVisible ? 1 : 0,
    transform: isPopoverVisible ? "translateY(0)" : "translateY(10px)",
    pointerEvents: isPopoverVisible ? "auto" : "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    ...(isSubmittedSuccessfully && {
      justifyContent: "center",
      alignItems: "center",
    }),
    gap: "10px",
  };

  const textareaContainerStyle: JSX.CSSProperties = {
    position: "relative",
    width: "100%",
  };

  const textareaStyle: JSX.CSSProperties = {
    width: "100%",
    padding: "10px",
    paddingBottom: "28px",
    borderRadius: "4px",
    border: "1px solid #555",
    background: "rgba(0, 0, 0, 0.3)",
    color: "#eee",
    boxSizing: "border-box",
    resize: "none",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    minHeight: "60px",
  };

  const inlineHintStyle: JSX.CSSProperties = {
    position: "absolute",
    bottom: "8px",
    right: "10px",
    fontSize: "0.75rem",
    color: "#666",
    pointerEvents: "none",
    zIndex: 1,
    opacity: comment.trim() !== "" ? 1 : 0,
    transition: "opacity 0.2s ease-in-out",
  };

  const bottomRowStyle: JSX.CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
    gap: "10px",
    minHeight: "24px",
  };

  const githubLinkStyle: JSX.CSSProperties = {
    display: "inline-block",
    color: "#cccccc",
    transition: "color 0.2s ease",
    flexShrink: 0,
  };

  const githubLinkHoverStyle: JSX.CSSProperties = {
    color: "#ffffff",
  };

  const formStyle: JSX.CSSProperties = {
    margin: 0,
    padding: 0,
    marginLeft: "auto",
    flexShrink: 0,
  };

  const submitButtonBaseColor = "hsl(210, 75%, 50%)";
  const submitButtonHoverColor = "hsl(210, 75%, 55%)";
  const submitButtonDisabledColor = "hsl(210, 15%, 40%)";

  const submitButtonBaseStyle: JSX.CSSProperties = {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "none",
    background: submitButtonBaseColor,
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.85rem",
    transition:
      "background-color 0.2s ease, transform 0.1s ease, color 0.2s ease",
    transform: "scale(1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "40px",
    minHeight: "32px",
  };

  const submitButtonLoadingStyle: JSX.CSSProperties = {
    ...submitButtonBaseStyle,
    background: "#555",
    color: "#aaa",
    cursor: "wait",
    transform: "scale(1)",
  };

  const submitButtonDisabledStyle: JSX.CSSProperties = {
    ...submitButtonBaseStyle,
    background: submitButtonDisabledColor,
    color: "#aaa",
    cursor: "not-allowed",
    transform: "scale(1)",
  };

  const submitButtonHoverStyle: JSX.CSSProperties = {
    background: submitButtonHoverColor,
    transform: "scale(1.02)",
  };

  const isButtonDisabled = isLoading || comment.trim() === "";
  const currentSubmitButtonStyle = isLoading
    ? submitButtonLoadingStyle
    : isButtonDisabled
    ? submitButtonDisabledStyle
    : submitButtonBaseStyle;

  const successHeartStyle: JSX.CSSProperties = {
    fontSize: "3rem",
    textAlign: "center",
    color: "#39d353",
    textShadow: `
      0 0 8px rgba(57, 211, 83, 0.7),
      0 0 12px rgba(57, 211, 83, 0.5),
      0 0 18px rgba(57, 211, 83, 0.3)
    `,
    margin: "auto",
    lineHeight: 1,
    animation: "pulse 1.5s infinite ease-in-out",
  };

  const statusMessageStyle: JSX.CSSProperties = {
    marginTop: "8px",
    marginBottom: 0,
    fontSize: "0.8rem",
    textAlign: "center",
    color: message.startsWith("Failed") ||
        message.startsWith("Comment cannot") ||
        message.startsWith("An error")
      ? "#ff8a8a"
      : "#cccccc",
    minHeight: "1em",
    width: "100%",
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={showPopover}
      onMouseLeave={startHideTimer}
    >
      {props.children}

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); text-shadow: 0 0 8px rgba(57, 211, 83, 0.7), 0 0 12px rgba(57, 211, 83, 0.5), 0 0 18px rgba(57, 211, 83, 0.3); }
            50% { transform: scale(1.08); text-shadow: 0 0 12px rgba(57, 211, 83, 0.9), 0 0 18px rgba(57, 211, 83, 0.7), 0 0 25px rgba(57, 211, 83, 0.5); }
            100% { transform: scale(1); text-shadow: 0 0 8px rgba(57, 211, 83, 0.7), 0 0 12px rgba(57, 211, 83, 0.5), 0 0 18px rgba(57, 211, 83, 0.3); }
          }
        `}
      </style>

      <div ref={popoverRef} style={popoverBaseStyle}>
        {isSubmittedSuccessfully ? <div style={successHeartStyle}>🙏</div> : (
          <>
            <div style={textareaContainerStyle}>
              <textarea
                ref={textareaRef}
                id="comment-input"
                value={comment}
                onInput={(e) =>
                  setComment((e.target as HTMLTextAreaElement).value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                required
                rows={3}
                maxLength={200}
                style={textareaStyle}
                placeholder="Say something&hellip;"
              />
              <span style={inlineHintStyle}>
                {modifierKeySymbol} + ↵
              </span>
            </div>

            <div style={bottomRowStyle}>
              <a
                href="https://github.com/seangreen-org/sg-fresh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source code on GitHub"
                style={githubLinkStyle}
                onMouseOver={(e) =>
                  Object.assign(e.currentTarget.style, githubLinkHoverStyle)}
                onMouseOut={(e) =>
                  Object.assign(e.currentTarget.style, githubLinkStyle)}
              >
                <GitHubLogo />
              </a>

              <form ref={formRef} onSubmit={handleSubmit} style={formStyle}>
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  style={currentSubmitButtonStyle}
                  aria-label="Send comment"
                  onMouseOver={(e) => {
                    if (!isButtonDisabled) {
                      Object.assign(
                        e.currentTarget.style,
                        submitButtonHoverStyle,
                      );
                    }
                  }}
                  onMouseOut={(e) => {
                    Object.assign(
                      e.currentTarget.style,
                      currentSubmitButtonStyle,
                    );
                  }}
                >
                  {isLoading ? "Sending..." : <SendIcon />}
                </button>
              </form>
            </div>
            {message && <p style={statusMessageStyle}>{message}</p>}
          </>
        )}
      </div>
    </div>
  );
}
