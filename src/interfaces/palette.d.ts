declare module '@mui/material/styles/createPalette' {
    interface PaletteOptions {
        borders?: PaletteColorOptions;
        login?: ILoginPaletteOptions;
    }
    interface Palette {
        borders?: PaletteColor;
    }
}

interface ILoginPaletteOptions {
    gradient?: IGradientPaletteOptions;
    main?: string;
}

interface IGradientPaletteOptions {
    top: string;
    bottom: string;
}
