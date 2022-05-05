import { ICustomTheme } from './ICustomTheme';


interface IGetThemeOptions {

}
export const getTheme = (options: IGetThemeOptions): ICustomTheme => {
  const unit = 8;
  const cssUnit = 'px';

  const getSpacing = (num: number) => num * 8;

  return {
    theme: {
      unit,
      font: 'roboto',
      background: {
        default: '#1e1e1e',
        paper: '#484848',
      },
      spacing: (num: number) => `${getSpacing(num)}${cssUnit}`,
      borderRadius: {
        large: `${getSpacing(3)}${cssUnit}`,
        small: `${getSpacing(0.5)}${cssUnit}`,
        medium: `${getSpacing(0.5)}${cssUnit}`,
      },
      typography: {
        headline1: {
          weight: `lighter`,
          size: `${getSpacing(6)}${cssUnit}`,
          letterSpacing: `${getSpacing(-0.1875)}${cssUnit}`,
        },
        headline2: {
          weight: `lighter`,
          size: `${getSpacing(6)}${cssUnit}`,
          letterSpacing: `${getSpacing(-0.0625)}${cssUnit}`,
        },
        headline3: {
          weight: `normal`,
          size: `${getSpacing(6)}${cssUnit}`,
          letterSpacing: `${getSpacing(0)}${cssUnit}`,
        },
        headline4: {
          weight: `normal`,
          size: `${getSpacing(4.25)}${cssUnit}`,
          letterSpacing: `${getSpacing(0.03125)}${cssUnit}`,
        },
        headline5: {
          weight: `normal`,
          size: `${getSpacing(3)}${cssUnit}`,
          letterSpacing: `${getSpacing(0)}${cssUnit}`,
        },
        headline6: {
          weight: 500,
          size: `${getSpacing(2.5)}${cssUnit}`,
          letterSpacing: `${getSpacing(0.01875)}${cssUnit}`,
        },
        subtitle1: {
          weight: `normal`,
          size: `${getSpacing(2)}${cssUnit}`,
          letterSpacing: `${getSpacing(0.01875)}${cssUnit}`,
        },
        subtitle2: {
          weight: 500,
          size: `${getSpacing(1.75)}${cssUnit}`,
          letterSpacing: `${getSpacing(0.0125)}${cssUnit}`,
        },
        body1: {
          weight: `normal`,
          size: `${getSpacing(2)}${cssUnit}`,
          letterSpacing: `${getSpacing(0.0625)}${cssUnit}`,
        },
        body2: {
          weight: `normal`,
          size: `${getSpacing(1.75)}${cssUnit}`,
          letterSpacing: `${getSpacing(0.03125)}${cssUnit}`,
        },
        button: {
          weight: 500,
          size: `${getSpacing(1.75)}${cssUnit}`,
          letterSpacing: `${getSpacing(0.15625)}${cssUnit}`,
        },
        caption: {
          weight: `normal`,
          size: `${getSpacing(1.5)}${cssUnit}`,
          letterSpacing: `${getSpacing(0.05)}${cssUnit}`,
        },
        overline: {
          weight: `normal`,
          size: `${getSpacing(1.25)}${cssUnit}`,
          letterSpacing: `${getSpacing(0.1875)}${cssUnit}`,
        },
      }
    }
  };
}
