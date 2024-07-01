import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fontSizes: any;
    fontWeights: any;
    fontFamilies: any;
    colors: any;
    deviceSize: any;
    deviceMargin: any;
    imageUrl: string;
  }
}
