import { css, FlattenInterpolation, FlattenSimpleInterpolation, ThemedStyledProps } from "styled-components";


interface TextColors {
  [key: string]: string,
}

const textColors: TextColors = {
  primary: "#0F0F59",
  secondary: "#626D8A",
  error: "#BF1616",
};

interface TextStylesProps {
  color: string, singleLine: boolean
}


/**
 * These are the styles that all text elements should have by default
 * Any component that uses this literal can have color prop.
 *
 */
const defaultStyles = css<TextStylesProps>`
  /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
  font-style: normal;
  font-weight: normal;
  color: ${(props) => textColors[props.color || "primary"]};
  ${({ singleLine }) =>
    singleLine &&
    `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`};
`;

const bold = css`
  font-weight: 600;
`;

const xxxLarge = css`
  ${defaultStyles};
  font-size: 62px;
  line-height: 74px;
  letter-spacing: -2px;
`;

const xxLarge = css`
  ${defaultStyles};
  font-size: 52px;
  line-height: 62px;
  letter-spacing: -1px;
`;

const xLarge = css`
  ${defaultStyles};
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
`;

const large = css`
  ${defaultStyles};
  font-weight: 600;
  font-size: 20px;
  line-height: 28;
`;

const medium = css`
  ${defaultStyles};
  font-size: 16px;
  line-height: 24px;
`;

const small = css`
  ${defaultStyles};
  font-size: 13px;
  line-height: 20px;
`;

const xSmall = css`
  ${defaultStyles};
  font-size: 11px;
  line-height: 16px;
`;

const xxSmall = css`
  ${defaultStyles};
  font-size: 10px;
  line-height: 15px;
`;

const mediumBold = css`
  ${medium};
  font-weight: 600;
`;

const smallBold = css`
  ${small};
  font-weight: 600;
`;

const xSmallBold = css`
  ${xSmall};
  font-weight: 600;
`;

const xSmallCaps = css`
  ${defaultStyles};
  font-size: 12px;
  line-height: 15px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const xxSmallCaps = css`
  ${xxSmall};
  font-weight: 600;
  text-transform: uppercase;
`;

const mediumLink = css`
  ${medium};
  line-height: 16px;
  text-decoration-line: underline;
`;

const smallLink = css`
  ${small};
  line-height: 13px;
  text-decoration-line: underline;
`;

const xSmallLink = css`
  ${xSmall};
  line-height: 11px;
  text-decoration-line: underline;
`;

const xxSmallLink = css`
  ${xxSmall};
  line-height: 11px;
  text-decoration-line: underline;
`;

const textTransform = {
  uppercase: css`
    text-transform: uppercase;
  `,
};

interface TextStylesType {
  textTransform: {
    uppercase: FlattenSimpleInterpolation,
  },
  xxxLarge : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  xxLarge : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  xLarge : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  medium : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  large : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  small : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  xSmall : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  xxSmall : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  mediumBold : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  xSmallBold : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  xSmallCaps : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  xxSmallCaps : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  mediumLink : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  smallLink : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  xSmallLink : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  xxSmallLink : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  smallBold : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  bold : FlattenInterpolation<ThemedStyledProps<TextStylesProps, any>>,
  textColors: TextColors,
  [key: string] : any
}

export const TextStyles: TextStylesType = {
  xxxLarge,
  xxLarge,
  xLarge,
  medium,
  large,
  small,
  xSmall,
  xxSmall,
  mediumBold,
  smallBold,
  xSmallBold,
  xSmallCaps,
  xxSmallCaps,
  mediumLink,
  smallLink,
  xSmallLink,
  xxSmallLink,
  bold,
  textColors,
  textTransform,
};

export default TextStyles;
