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
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key !== "Enter") return;

            e.preventDefault(); // prevent submit

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

            // detect react-select inner input
            const current =
                (e.target as HTMLElement)
                    .closest(".rs__input")
                    ?.querySelector("input") || (e.target as HTMLElement);

            const index = focusable.indexOf(current as HTMLElement);
            if (index === -1) return;

            const nextIndex = e.shiftKey ? index - 1 : index + 1;
            const next = focusable[nextIndex];
            if (!next) return;

            // react-select focus fix
            if (next.classList.contains(reactSelectClassName)) {
                (next.querySelector("input") as HTMLInputElement)?.focus();
            } else {
                next.focus();
            }
        },
        [formRef, reactSelectClassName]
    );

    return { handleKeyDown };
};