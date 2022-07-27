declare module '@mui/material/styles' {
    interface CustomTheme {
        /**
         * @deprecated
         */
        fontSizes: {
            mainHeader: string;
            subHeader: string;
            bodySize: string;
            smallBody: string;
            smallerBody: string;
        };
        /**
         * @deprecated
         */
        fontWeight: {
            thin: number;
            medium: number;
            semi: number;
            bold: number;
        };
        /**
         * @deprecated
         */
        boxShadows: {
            main: string;
            card: string;
            elevated: string;
        };
    }

    interface CustomPalette {
        /**
         * Generic neutral palette color.
         */
        neutral: PaletteColorOptions;
        /**
         * Colors for event log output.
         */
        code: {
            main: string;
            diffAdd: string;
            diffSub: string;
            diffNeutral: string;
            edited: string;
            background: string;
        };
        /**
         * For 'Seen' column on feature toggles list.
         */
        activityIndicators: {
            unknown: string;
            recent: string;
            inactive: string;
            abandoned: string;
        };
        dividerAlternative: string;
        /**
         * For table header hover effect.
         */
        tableHeaderHover: string;
        /**
         * Text highlight effect color. Used when filtering/searching over content.
         */
        highlight: string;
        /**
         * Background color for secondary containers.
         */
        secondaryContainer: string;
        /**
         * Background color for sidebar containers.
         */
        sidebarContainer: string;
        /**
         * Icon that doesn't have an action (visual only, no click handler).
         *
         * @deprecated use `<YourIcon color="disabled" />`.
         * ⚠️ `color` only works with `import { YourIcon } from "@mui/icons"`
         * and not with `import YourIcon from "@mui/icons/YourIcon"`.
         */
        inactiveIcon: string;

        /** A border color used for contrast between similar backgroundColors **/
        lightBorder: string;

        /* Type for tertiary colors */
        tertiary: {
            main: string;
            light: string;
            dark: string;
            background: string;
            contrast: string;
        };
    }

    interface CustomTypeText {
        tertiaryContrast: string;
    }

    interface Theme extends CustomTheme {}
    interface ThemeOptions extends CustomTheme {}

    interface Palette extends CustomPalette {}
    interface PaletteOptions extends CustomPalette {}

    interface TypeText extends CustomTypeText {}

    interface PaletteColor {
        light: string;
        main: string;
        dark: string;
        border: string;
    }
    interface PaletteColorOptions {
        light?: string;
        main?: string;
        dark?: string;
        border?: string;
    }
}

declare module '@mui/system/createTheme/shape' {
    interface Shape {
        borderRadiusMedium: string;
        borderRadiusLarge: string;
        borderRadiusExtraLarge: string;
        tableRowHeight: number;
        tableRowHeightCompact: number;
        tableRowHeightDense: number;
    }
}
declare module '@mui/material/styles/zIndex' {
    interface ZIndex {
        sticky: number;
    }
}

export {};
