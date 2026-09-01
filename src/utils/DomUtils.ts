export class DomUtils {

    static waitForElement(
        elementSelector: string,
        func: (element: Element | null) => void,
        attempts: number = 50
    ): void {
        const element = document.querySelector(elementSelector);

        if (element) {
            func(element);
            return;
        }

        if (attempts <= 0) {
            func(null);
            return;
        }

        window.setTimeout(
            () => DomUtils.waitForElement(elementSelector, func, attempts - 1),
            100
        );
    }
}