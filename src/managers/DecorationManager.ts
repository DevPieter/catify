import {BarDecoration} from "../types/models/BarDecoration";
import {DomUtils} from "../utils/DomUtils";

export class DecorationManager {

    private _initialized: boolean = false;
    private _bar: HTMLElement | null = null;
    private _container: HTMLElement | null = null;

    public initLater(func: () => void): void {
        if (this._initialized) return;
        console.log("[Catify] DecorationManager: Waiting for playback progress bar to initialize.");

        DomUtils.waitForElement(".player-controls .playback-progressbar", bar => {
            if (!bar) {
                console.warn("[Catify] DecorationManager: Failed to find playback progress bar.");
                return;
            }

            console.log("[Catify] DecorationManager: Playback progress bar found. Initializing.");

            this._bar = bar as HTMLElement;
            this._container = document.createElement("div");
            this._container.classList.add("catify__img-container");
            this._bar.prepend(this._container);

            const decorationStyle = document.createElement("style");
            decorationStyle.textContent = `
            .catify__img-container {
                position: relative;
            }

            .catify__decoration {
                position: absolute;
                pointer-events: none;
            }

            .catify__img-container--paused .catify__decoration {
                animation-play-state: paused !important;
            }
        `;

            document.head.appendChild(decorationStyle);

            Spicetify.Player.addEventListener("onplaypause", (event) => {
                this.setPaused(event?.data.isPaused ?? !Spicetify.Player.isPlaying());
            });

            this._initialized = true;

            func();
        });
    }

    public placeDecorations(decorations: BarDecoration[]): void {
        if (!this._initialized) return;

        console.log("[Catify] DecorationManager: Placing decorations on the playback progress bar.");
        decorations.forEach(decoration => this.placeBarDecoration(decoration));

        setTimeout(
            () => this.setPaused(!Spicetify.Player.isPlaying()),
            100
        );
    }

    private placeBarDecoration(decoration: BarDecoration): boolean {
        if (!this._initialized || !this._container) return false;

        const decoElement = document.createElement("img");
        decoElement.classList.add("catify__decoration");

        decoElement.src = decoration.src;

        if (decoration.size) {
            if (decoration.size.width) decoElement.style.width = decoration.size.width;
            if (decoration.size.height) decoElement.style.height = decoration.size.height;
        }

        if (decoration.position) {
            if (decoration.position.left) decoElement.style.left = decoration.position.left;
            if (decoration.position.top) decoElement.style.top = decoration.position.top;
            if (decoration.position.right) decoElement.style.right = decoration.position.right;
            if (decoration.position.bottom) decoElement.style.bottom = decoration.position.bottom;
        }

        this._container.appendChild(decoElement);
        return true;
    }

    private setPaused(paused: boolean): void {
        this._container?.classList.toggle("catify__img-container--paused", paused);

        if (paused) {
            this._container
                ?.querySelectorAll<HTMLImageElement>("img.catify__decoration")
                .forEach(decoration => this.freezeDecoration(decoration));

            return;
        }

        this._container
            ?.querySelectorAll<HTMLCanvasElement>("canvas.catify__decoration-snapshot")
            .forEach(snapshot => snapshot.remove());

        this._container
            ?.querySelectorAll<HTMLImageElement>("img.catify__decoration")
            .forEach(decoration => {
                decoration.hidden = false;
                delete decoration.dataset.catifyFrozen;
            });
    }

    private freezeDecoration(decoration: HTMLImageElement): void {
        // Kinda hacky, but the only way to freeze a WebP
        if (
            decoration.dataset.catifyFrozen === "true" || !decoration.complete ||
            decoration.naturalWidth === 0 || decoration.naturalHeight === 0
        ) return;

        const snapshot = document.createElement("canvas");
        snapshot.className = `${decoration.className} catify__decoration-snapshot`;
        snapshot.style.cssText = decoration.style.cssText;
        snapshot.width = decoration.naturalWidth;
        snapshot.height = decoration.naturalHeight;

        const context = snapshot.getContext("2d");
        if (!context) return;

        context.drawImage(decoration, 0, 0, snapshot.width, snapshot.height);
        decoration.dataset.catifyFrozen = "true";
        decoration.hidden = true;
        decoration.insertAdjacentElement("afterend", snapshot);
    }
}
