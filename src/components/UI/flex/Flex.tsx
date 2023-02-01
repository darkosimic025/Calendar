import styled from "styled-components";

export interface FlexGroupProps {
  direction?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
}

export const FlexGroup = styled.div<FlexGroupProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-wrap: ${({ wrap }) => wrap};
`;

export interface FlexItemProps {
  order?: number;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
  alignSelf?:
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch";
}

export const FlexItem = styled.div<FlexItemProps>`
  margin-left: 3px;
  order: ${({ order }) => order};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-shrink: ${({ flexShrink }) => flexShrink};
  flex-basis: ${({ flexBasis }) => flexBasis};
  align-self: ${({ alignSelf }) => alignSelf};
`;
