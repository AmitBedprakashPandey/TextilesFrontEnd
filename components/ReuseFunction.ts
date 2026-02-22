import { useCallback } from "react";


interface Options {
    formRef: React.RefObject<HTMLFormElement | null>;
    reactSelectClassName?: string; // default: "rs__control"
}

interface FocusNextOptions {
    nextRef: React.RefObject<HTMLFormElement | null>,
    element: string,
    name: string
}

export const useNewtabOpener = (url: string) => {
  window.open(url,"_blank");
}

export const focusNext = (nextRef?: React.RefObject<HTMLInputElement | HTMLButtonElement | null>) =>
    (e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            nextRef?.current?.focus();
        }
    };


export const useDirectFocus = ({element, name,nextRef} : FocusNextOptions) => {
    const el = nextRef.current?.getElementsByTagName(element)?.namedItem(name) as HTMLInputElement | null
    el?.focus()
    el?.select()

}


export const useEnterNavigation = ({
    formRef,
    reactSelectClassName = "rs__control",
}: Options) => {

    const focusNext = (currentEl: HTMLElement, backward = false) => {
        const form = formRef.current;
        if (!form) return;

        const focusable = Array.from(
            form.querySelectorAll<HTMLElement>(
                `input:not([disabled]),
                 textarea:not([disabled]),
                 select:not([disabled]),
                 button:not([disabled]),
                 [tabindex]:not([tabindex="-1"])`
            )
        ).filter((el) => el.offsetParent !== null);

        const index = focusable.indexOf(currentEl);
        if (index === -1) return;

        const nextIndex = backward ? index - 1 : index + 1;
        const next = focusable[nextIndex];
        if (!next) return;

        // React Select
        if (next.classList.contains(reactSelectClassName)) {
            const input = next.querySelector("input") as HTMLInputElement | null;
            input?.focus();
            
            return;
        }

        // Native Select
        if (next instanceof HTMLSelectElement) {
            next.focus();
            return;
        }

        next.focus();

        if (
            next instanceof HTMLInputElement ||
            next instanceof HTMLTextAreaElement
        ) {
            requestAnimationFrame(() => {
                next.setSelectionRange(0, next.value.length);
            });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return;

          const target = e.target as HTMLElement;
    const form = formRef.current;

    if (!form) return;

    const isSubmitButton =
        target instanceof HTMLButtonElement &&
        (target.type === "submit" || target.getAttribute("type") === "submit");

    // ✅ If submit button is focused → allow normal submit
    if (isSubmitButton) {
        return;
    }


        e.preventDefault();

        const current =     (e.target as HTMLElement)
                .closest(".rs__input")
                ?.querySelector("input") ||
            (e.target as HTMLElement);

        focusNext(current as HTMLElement, e.shiftKey);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        focusNext(e.target as HTMLElement);
    };

    return { handleKeyDown, handleSelectChange };
};