export const focusNext = (nextRef?: React.RefObject<HTMLInputElement | HTMLButtonElement| null>) =>
        (e: React.KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
            if (e.key === "Enter") {
                e.preventDefault();
                nextRef?.current?.focus();
            }
        };