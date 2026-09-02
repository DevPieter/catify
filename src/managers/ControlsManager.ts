export class ControlsManager {

    private _initialized: boolean = false;
    private _playMask: string | null = null;
    private _pauseMask: string | null = null;

    public init(playPath: string, pausePath: string): void {
        if (this._initialized) return;
        console.log("[Catify] ControlsManager: Initializing playback icons.");

        this._playMask = this.createMask(playPath);
        this._pauseMask = this.createMask(pausePath);

        const style = document.createElement("style");
        document.head.appendChild(style);

        const selector = '.player-controls__buttons [data-testid="control-button-playpause"] svg';

        const updateIcon = (paused: boolean): void => {
            const mask = paused ? this._playMask : this._pauseMask;

            style.textContent = `
            ${selector} {
                transform: scale(1.25);
                transform-origin: center;
                background-color: currentColor;
                -webkit-mask: ${mask} center / contain no-repeat;
                mask: ${mask} center / contain no-repeat;
            }
            
            ${selector} > * {
                opacity: 0 !important;
            }
        `;
        };

        Spicetify.Player.addEventListener("onplaypause", event => {
            updateIcon(event?.data?.isPaused ?? !Spicetify.Player.isPlaying());
        });

        updateIcon(!Spicetify.Player.isPlaying());
        this._initialized = true;
    }

    private createMask(path: string): string {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="${path}"/></svg>`;
        return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    }
}