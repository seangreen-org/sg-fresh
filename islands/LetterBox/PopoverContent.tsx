import { Ref } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { GitHubLogo, SendIcon } from "./icons.tsx";

const GITHUB_REPO_URL = "https://github.com/seangreen-org/sg-fresh";

interface PopoverContentProps {
  isVisible: boolean;
  isSubmittedSuccessfully: boolean;
  comment: string;
  isLoading: boolean;
  message: string;
  modifierKeySymbol: string;
  showKeyboardHint: boolean;

  popoverRef: Ref<HTMLDivElement>;
  textareaRef: Ref<HTMLTextAreaElement>;
  formRef: Ref<HTMLFormElement>;

  setComment: (value: string) => void;
  handleKeyDown: (e: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e?: JSX.TargetedEvent<HTMLFormElement, Event>) => void;
}

export function PopoverContent({
  isVisible,
  isSubmittedSuccessfully,
  comment,
  isLoading,
  message,
  modifierKeySymbol,
  showKeyboardHint,
  popoverRef,
  textareaRef,
  formRef,
  setComment,
  handleKeyDown,
  handleSubmit,
}: PopoverContentProps): JSX.Element {
  const popoverVisibilityClass = isVisible ? "visible" : "hidden";
  const popoverSuccessClass = isSubmittedSuccessfully ? "success-mode" : "";
  const isButtonDisabled = isLoading || comment.trim() === "";

  const hasError = message &&
    (message.startsWith("Failed") ||
      message.startsWith("Comment cannot") ||
      message.includes("error"));

  return (
    <div
      ref={popoverRef}
      className={`popover-base ${popoverVisibilityClass} ${popoverSuccessClass}`}
    >
      {isSubmittedSuccessfully
        ? <div className="popover-success-heart">🙏</div>
        : (
          <>
            <div
              className={`popover-textarea-container ${
                showKeyboardHint ? "has-hint" : ""
              }`}
            >
              <textarea
                ref={textareaRef}
                id="letterbox-comment-input"
                className="popover-textarea"
                value={comment}
                onInput={(e) =>
                  setComment((e.target as HTMLTextAreaElement).value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                required
                maxLength={200}
                placeholder="Say something&hellip;"
                aria-label="Comment input"
              />
              {showKeyboardHint && (
                <span className="popover-inline-hint" aria-hidden="true">
                  {modifierKeySymbol} + ↵
                </span>
              )}
            </div>

            <div className="popover-bottom-row">
              <a
                href={GITHUB_REPO_URL}
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
                  aria-label={isLoading ? "Sending comment" : "Send comment"}
                  aria-live="polite"
                >
                  {isLoading ? "Sending..." : <SendIcon />}
                </button>
              </form>
            </div>
            {message && (
              <p
                className={`popover-status-message ${hasError ? "error" : ""}`}
                role="alert"
              >
                {message}
              </p>
            )}
          </>
        )}
    </div>
  );
}
