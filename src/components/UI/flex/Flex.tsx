import styled from "styled-components";

interface FlexGroupProps {
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

const FlexGroup = styled.div<FlexGroupProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-wrap: ${(props) => props.wrap};
`;

interface FlexItemProps {
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

const FlexItem = styled.div<FlexItemProps>`
margin-left: 3px;
  order: ${(props) => props.order};
  flex-grow: ${(props) => props.flexGrow};
  flex-shrink: ${(props) => props.flexShrink};
  flex-basis: ${(props) => props.flexBasis};
  align-self: ${(props) => props.alignSelf};
`;

export { FlexGroup, FlexItem };
