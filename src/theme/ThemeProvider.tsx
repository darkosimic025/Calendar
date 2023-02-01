import type { DefaultTheme } from "styled-components";

const lightTheme: DefaultTheme = {
  background: "#fff",
  button: {
    colors: {
      primary: {
        background: "#cce4f5",
        textColor: "#0061a6",
        selectedBackground: "#0061a6",
        selectedTextColor: "#fff",
      },
      secondary: {
        background: "#ccc",
        textColor: "#333",
        selectedBackground: "#00a666",
        selectedTextColor: "#fff",
      },
    },
    fontSize: {
      small: "14px",
      large: "18px",
      medium: "16px",
    },
    padding: {
      small: "6px 16px",
      large: "16px 32px",
      medium: "12px 24px",
    },
  },
  emptyButton: {
    colors: {
      primary: {
        textColor: "#0061a6",
      },
      secondary: {
        textColor: "#333",
      },
    },
    fontSize: {
      small: "14px",
      large: "18px",
      medium: "16px",
    },
    padding: {
      small: "2px 2px",
      large: "8px 8px",
      medium: "4px 4px",
    },
  },
  iconButton: {
    colors: {
      primary: {
        background: "#cce4f5",
        textColor: "#0061a6",
        hoverBackground: "#cce4f5ae",
      },
      secondary: {
        background: "#cce4f5",
        textColor: "#0061a6",
        hoverBackground: "#cce4f5ae",
      },
    },
    size: {
      height: {
        small: "16px",
        large: "32px",
        medium: "24px",
      },
      width: {
        small: "16px",
        large: "32px",
        medium: "24px",
      },
    },
  },
  popover: {
    colors: {
      background: "#fff",
    },
    shadow:
      "0px 4px 4px 0px rgba(60, 64, 67, 0.3),0px 8px 12px 6px rgba(60, 64, 67, 0.15)",
  },
  select: {
    selectControl: {
      colors: {
        background: "#fff",
        border: "#d9d9d9",
        borderHover: "#0061a6",
      },
    },
    selectOption: {
      colors: {
        background: "#fff",
        backgroundHover: "#0061a6",
        backgroundSelected: "#f0f9ff",
      },
    },
    selectOptions: {
      colors: {
        background: "#fff",
        border: "#d9d9d9",
      },
    },
  },
  table: {
    commonBorder: "rgb(218, 220, 224) 1px solid",
    tableHead: {
      colors: {
        background: "#fff",
      },
    },
  },
  badge: {
    colors: {
      primary: "#17a2b8",
      secondary: "#6c757d",
      teritary: "#7e3b78",
    },
    textColor: "#fff",
  },
  calendar: {
    common: {
      colors: {
        isToday: "#98d4ffba",
        notToday: "transparent",
      },
    },
    month: {
      cell: {
        colors: {
          currentMonth: "#fff",
          notCurrentMonth: "#f3efef70",
          hover: "#f5f5f5",
        },
      },
    },
    day: {
      cell: {
        backgroundWithLines:
          "repeating-linear-gradient(to bottom, transparent 0, transparent 59px, rgb(218, 220, 224) 60px,rgb(218, 220, 224) 60px )",
      },
    },
    timeline: {
      border: "1px solid #dadce0",
      textColor: "#89898a1489361547%, 53.92156862745098%)",
      labelBackground: "#fff",
    },
  },
};

const darkTheme: DefaultTheme = {
  background: "#142850",
  button: {
    colors: {
      primary: {
        background: "#cce4f5",
        textColor: "#0061a6",
        selectedBackground: "#0061a6",
        selectedTextColor: "#fff",
      },
      secondary: {
        background: "#ccc",
        textColor: "#333",
        selectedBackground: "#00a666",
        selectedTextColor: "#fff",
      },
    },
    fontSize: {
      small: "14px",
      large: "18px",
      medium: "16px",
    },
    padding: {
      small: "6px 16px",
      large: "16px 32px",
      medium: "12px 24px",
    },
  },
  emptyButton: {
    colors: {
      primary: {
        textColor: "#0061a6",
      },
      secondary: {
        textColor: "#333",
      },
    },
    fontSize: {
      small: "14px",
      large: "18px",
      medium: "16px",
    },
    padding: {
      small: "2px 2px",
      large: "8px 8px",
      medium: "4px 4px",
    },
  },
  iconButton: {
    colors: {
      primary: {
        background: "#cce4f5",
        textColor: "#0061a6",
        hoverBackground: "#cce4f5ae",
      },
      secondary: {
        background: "#cce4f5",
        textColor: "#0061a6",
        hoverBackground: "#cce4f5ae",
      },
    },
    size: {
      height: {
        small: "16px",
        large: "32px",
        medium: "24px",
      },
      width: {
        small: "16px",
        large: "32px",
        medium: "24px",
      },
    },
  },
  popover: {
    colors: {
      background: "#fff",
    },
    shadow:
      "0px 4px 4px 0px rgba(60, 64, 67, 0.3),0px 8px 12px 6px rgba(60, 64, 67, 0.15)",
  },
  select: {
    selectControl: {
      colors: {
        background: "#fff",
        border: "#d9d9d9",
        borderHover: "#0061a6",
      },
    },
    selectOption: {
      colors: {
        background: "#fff",
        backgroundHover: "#0061a6",
        backgroundSelected: "#f0f9ff",
      },
    },
    selectOptions: {
      colors: {
        background: "#fff",
        border: "#d9d9d9",
      },
    },
  },
  table: {
    commonBorder: "rgb(218, 220, 224) 1px solid",
    tableHead: {
      colors: {
        background: "#fff",
      },
    },
  },
  badge: {
    colors: {
      primary: "#17a2b8",
      secondary: "#6c757d",
      teritary: "#7e3b78",
    },
    textColor: "#fff",
  },
  calendar: {
    common: {
      colors: {
        isToday: "#98d4ffba",
        notToday: "transparent",
      },
    },
    month: {
      cell: {
        colors: {
          currentMonth: "#fff",
          notCurrentMonth: "#f3efef70",
          hover: "#f5f5f5",
        },
      },
    },
    day: {
      cell: {
        backgroundWithLines:
          "repeating-linear-gradient(to bottom, transparent 0, transparent 59px, rgb(218, 220, 224) 60px,rgb(218, 220, 224) 60px )",
      },
    },
    timeline: {
      border: "1px solid #dadce0",
      textColor: "#89898a1489361547%, 53.92156862745098%)",
      labelBackground: "#fff",
    },
  },
};

export { lightTheme, darkTheme };
