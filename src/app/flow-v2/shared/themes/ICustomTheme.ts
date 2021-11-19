
interface ITypography {
  size: string,
  letterSpacing: string,
  weight: "bolder" | "lighter" | "bold" | "normal" | (number & {}),
}

export interface ICustomTheme {
  theme?: {
    font: string,
    unit: number,
    background: {
      default: string,
      paper: string,
    },
    spacing: (num: number) => string,
    borderRadius: {
      small: string,
      medium: string,
      large: string,
    },
    typography: {
      headline1: ITypography,
      headline2: ITypography,
      headline3: ITypography,
      headline4: ITypography,
      headline5: ITypography,
      headline6: ITypography,
      subtitle1: ITypography,
      subtitle2: ITypography,
      body1: ITypography,
      body2: ITypography,
      button: ITypography,
      caption: ITypography,
      overline: ITypography,
    }
  }
}

