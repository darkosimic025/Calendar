import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    button: {
      colors: {
        primary: {
          background: string;
          textColor: string;
          selectedBackground: string;
          selectedTextColor: string;
        };
        secondary: {
          background: string;
          textColor: string;
          selectedBackground: string;
          selectedTextColor: string;
        };
      };
      fontSize: {
        small: string;
        large: string;
        medium: string;
      };
      padding: {
        small: string;
        large: string;
        medium: string;
      };
    };
    emptyButton: {
      colors: {
        primary: {
          textColor: string;
        };
        secondary: {
          textColor: string;
        };
      };
      fontSize: {
        small: string;
        large: string;
        medium: string;
      };
      padding: {
        small: string;
        large: string;
        medium: string;
      };
    };
    iconButton: {
      colors: {
        primary: {
          background: string;
          textColor: string;
          hoverBackground: string;
        };
        secondary: {
          background: string;
          textColor: string;
          hoverBackground: string;
        };
      };
      size: {
        height: {
          small: string;
          large: string;
          medium: string;
        };
        width: {
          small: string;
          large: string;
          medium: string;
        };
      };
    };
    popover: {
      colors: {
        background: string;
      };
      shadow: string;
    };
    select: {
      selectControl: {
        colors: {
          background: string;
          border: string;
          borderHover: string;
        };
      };
      selectOption: {
        colors: {
          background: string;
          backgroundHover: string;
          backgroundSelected: string;
        };
      };
      selectOptions: {
        colors: {
          background: string;
          border: string;
        };
      };
    };
    table: {
      commonBorder: string;
      tableHead: {
        colors: {
          background: string;
        };
      };
    };
    badge: {
      colors: {
        primary: string;
        secondary: string;
        teritary: string;
      };
      textColor: string;
    };
    calendar: {
      common: {
        colors: {
          isToday: string;
          notToday: string;
        };
      };
      month: {
        cell: {
          colors: {
            currentMonth: string;
            notCurrentMonth: string;
            hover: string;
          };
        };
      };
      day: {
        cell: {
          backgroundWithLines: string;
        };
      };
      timeline: {
        border: string;
        textColor: string;
        labelBackground: string;
      };
    };
  }
}
