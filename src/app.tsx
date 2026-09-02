import {DecorationManager} from "./managers/DecorationManager";
import {ControlsManager} from "./managers/ControlsManager";

async function main() {

    const ctrlsManager = new ControlsManager();

    const catHead: string = "M2.05 1.1C1.72.91 1.32 1.18 1.38 1.55L1.98 5.1C.98 6.16.5 7.46.5 8.9C.5 12.54 3.5 15 8 15S15.5 12.54 15.5 8.9C15.5 7.46 15.02 6.16 14.02 5.1L14.62 1.55C14.68 1.18 14.28.91 13.95 1.1L10.45 3.16C8.84 2.75 7.16 2.75 5.55 3.16Z";
    const playPath: string = catHead + "M6 6.35Q6 5.9 6.4 6.12L10.6 8.6Q11.05 8.9 10.6 9.2L6.4 11.68Q6 11.9 6 11.45Z";
    const pausePath: string = catHead + "M5.4 6H6.6A.4.4 0 0 1 7 6.4V11.6A.4.4 0 0 1 6.6 12H5.4A.4.4 0 0 1 5 11.6V6.4A.4.4 0 0 1 5.4 6ZM9.4 6H10.6A.4.4 0 0 1 11 6.4V11.6A.4.4 0 0 1 10.6 12H9.4A.4.4 0 0 1 9 11.6V6.4A.4.4 0 0 1 9.4 6Z";

    ctrlsManager.init(playPath, pausePath);

    const decoManager = new DecorationManager();
    decoManager.initLater(() => {
        decoManager.placeBarDecorations([
            {
                src: "https://cdn.pietr.space/statics/catify/cat_dance_white.webp",

                size: {
                    width: "28px",
                },

                position: {
                    left: "20px",
                    bottom: "calc(100% - 4px)"
                }
            },
            {
                src: "https://cdn.pietr.space/statics/catify/cat_dance_black.webp",

                size: {
                    width: "26px",
                },

                position: {
                    left: "64px",
                    bottom: "calc(100% - 4px)"
                }
            },
            {
                src: "https://cdn.pietr.space/statics/catify/cat_dance_scuba.webp",

                size: {
                    width: "64px",
                },

                position: {
                    right: "10px",
                    bottom: "calc(100% - 16px)"
                }
            }
        ]);
    });
}

export default main