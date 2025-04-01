import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { usePlatformInfo } from "@hooks/usePlatformInfo.ts";
import { PopoverContent } from "./PopoverContent.tsx";
import { letterboxStyles } from "./styles.ts";

const FADE_OUT_DELAY = 2000;
const TRANSITION_DURATION = 200;
const COMMENT_API_ENDPOINT = "/api/comment";

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

  const closePopover = useCallback(() => {
    clearSuccessTimer();
    setIsPopoverVisible(false);
    setTimeout(() => {
      if (!isPopoverVisible) {
        setIsSubmittedSuccessfully(false);
        setComment("");
        setMessage("");
        setIsLoading(false);
      }
    }, TRANSITION_DURATION);
  }, [isPopoverVisible, clearSuccessTimer]);

  const showPopover = useCallback(() => {
    clearSuccessTimer();
    setIsSubmittedSuccessfully(false);
    setMessage("");
    if (!isPopoverVisible) {
      setIsPopoverVisible(true);
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  }, [isPopoverVisible, clearSuccessTimer]);

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
    [comment, isLoading, clearSuccessTimer, closePopover],
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
        !popoverRef.current.contains(event.target as Node)
      ) {
        if (
          !triggerRef.current ||
          !triggerRef.current.contains(event.target as Node)
        ) {
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
  }, [isPopoverVisible, popoverRef, triggerRef, closePopover]);

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
  }, [isPopoverVisible, closePopover]);

  useEffect(() => {
    return () => {
      clearSuccessTimer();
    };
  }, [clearSuccessTimer]);

  return (
    <>
      <style>{letterboxStyles}</style>

      <div
        ref={triggerRef}
        className="popover-trigger-wrapper"
        onClick={showPopover}
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
