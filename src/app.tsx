import {DecorationManager} from "./managers/DecorationManager";

async function main() {

    const decoManager = new DecorationManager();
    decoManager.initLater(() => {
        decoManager.placeDecorations([
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
