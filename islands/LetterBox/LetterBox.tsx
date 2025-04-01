import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { usePlatformInfo } from "@hooks/usePlatformInfo.ts";
import { PopoverContent } from "./PopoverContent.tsx";
import { letterboxStyles } from "./styles.ts";

const FADE_OUT_DELAY = 2000;
const TRANSITION_DURATION = 200;
const COMMENT_API_ENDPOINT = "/api/comment";
const HOVER_CLOSE_DELAY = 150;

interface LetterBoxProps {
  children: JSX.Element;
}

export default function Letterbox(
  { children }: LetterBoxProps,
): JSX.Element {
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fadeOutTimeoutRef = useRef<number | undefined>();
  const hoverCloseTimerRef = useRef<number | undefined>();

  const { isMacLike, isTouchMobile } = usePlatformInfo();
  const modifierKeySymbol = isMacLike ? "⌘" : "Ctrl";
  const showKeyboardHint = !isTouchMobile;

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const clearSuccessTimer = useCallback(() => {
    clearTimeout(fadeOutTimeoutRef.current);
    fadeOutTimeoutRef.current = undefined;
  }, []);

  const clearHoverCloseTimer = useCallback(() => {
    clearTimeout(hoverCloseTimerRef.current);
    hoverCloseTimerRef.current = undefined;
  }, []);

  const closePopover = useCallback(() => {
    clearHoverCloseTimer();
    clearSuccessTimer();
    setIsPopoverVisible(false);
    setTimeout(() => {
      if (!popoverRef.current?.classList.contains("visible")) {
        setIsSubmittedSuccessfully(false);
        setMessage("");
        setIsLoading(false);
      }
    }, TRANSITION_DURATION);
  }, [clearSuccessTimer, clearHoverCloseTimer]);

  const showPopover = useCallback(() => {
    clearHoverCloseTimer();
    clearSuccessTimer();
    setIsSubmittedSuccessfully(false);
    setMessage("");
    if (!isPopoverVisible) {
      setIsPopoverVisible(true);
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  }, [isPopoverVisible, clearSuccessTimer, clearHoverCloseTimer]);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchMobile) {
      clearHoverCloseTimer();
      showPopover();
    }
  }, [isTouchMobile, showPopover, clearHoverCloseTimer]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouchMobile) {
      clearHoverCloseTimer();
      hoverCloseTimerRef.current = setTimeout(() => {
        if (!isLoading && !isSubmittedSuccessfully && !comment.trim()) {
          closePopover();
        }
      }, HOVER_CLOSE_DELAY);
    }
  }, [
    isTouchMobile,
    closePopover,
    clearHoverCloseTimer,
    isLoading,
    isSubmittedSuccessfully,
    comment,
  ]);

  const handleMobileClick = useCallback(() => {
    if (isTouchMobile && !isPopoverVisible) {
      showPopover();
    }
  }, [isTouchMobile, isPopoverVisible, showPopover]);

  const handleSubmit = useCallback(
    async (e?: JSX.TargetedEvent<HTMLFormElement, Event>) => {
      e?.preventDefault();
      if (!comment.trim() || isLoading) {
        return;
      }
      setIsLoading(true);
      setMessage("");
      setIsSubmittedSuccessfully(false);
      clearSuccessTimer();
      clearHoverCloseTimer();

      try {
        const response = await fetch(COMMENT_API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: comment.trim() }),
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
        setMessage(
          error instanceof Error ? error.message : "An unknown error occurred.",
        );
        setIsSubmittedSuccessfully(false);
      } finally {
        setIsLoading(false);
      }
    },
    [
      comment,
      isLoading,
      clearSuccessTimer,
      closePopover,
      clearHoverCloseTimer,
    ],
  );

  const handleKeyDown = useCallback(
    (e: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) => {
      const isModKeyPressed = isMacLike ? e.metaKey : e.ctrlKey;

      if (
        e.key === "Enter" &&
        isModKeyPressed &&
        !isLoading &&
        comment.trim() !== ""
      ) {
        e.preventDefault();
        if (formRef.current?.requestSubmit) {
          formRef.current.requestSubmit();
        } else {
          handleSubmit();
        }
      }
    },
    [isLoading, comment, handleSubmit, isMacLike],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isPopoverVisible &&
        popoverRef.current &&
        triggerRef.current &&
        event.target
      ) {
        if (
          !popoverRef.current.contains(event.target as Node) &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          if (!isLoading && !isSubmittedSuccessfully) {
            closePopover();
          }
        }
      }
    };

    if (isPopoverVisible) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [
    isPopoverVisible,
    popoverRef,
    triggerRef,
    closePopover,
    isLoading,
    isSubmittedSuccessfully,
  ]);

  // Effect for handling the Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Only close if not currently loading or showing success message
        if (!isLoading && !isSubmittedSuccessfully) {
          closePopover();
        }
      }
    };

    if (isPopoverVisible) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isPopoverVisible, closePopover, isLoading, isSubmittedSuccessfully]);

  // Effect for cleaning up timers on unmount
  useEffect(() => {
    return () => {
      clearSuccessTimer();
      clearHoverCloseTimer();
    };
  }, [clearSuccessTimer, clearHoverCloseTimer]);

  return (
    <>
      <style>{letterboxStyles}</style>

      <div
        ref={triggerRef}
        className="popover-trigger-wrapper"
        onClick={isTouchMobile ? handleMobileClick : undefined}
        onMouseEnter={!isTouchMobile ? handleMouseEnter : undefined}
        onMouseLeave={!isTouchMobile ? handleMouseLeave : undefined}
      >
        {children}

        <PopoverContent
          isVisible={isPopoverVisible}
          isSubmittedSuccessfully={isSubmittedSuccessfully}
          comment={comment}
          isLoading={isLoading}
          message={message}
          modifierKeySymbol={modifierKeySymbol}
          showKeyboardHint={showKeyboardHint}
          popoverRef={popoverRef}
          textareaRef={textareaRef}
          formRef={formRef}
          setComment={setComment}
          handleKeyDown={handleKeyDown}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
