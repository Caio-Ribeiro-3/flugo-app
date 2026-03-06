import { useCallback } from "react";

export function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay = 500
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

export const useDebounce = (fn: Parameters<typeof debounce>[0]) => {
    return useCallback(debounce(fn), [fn])
}