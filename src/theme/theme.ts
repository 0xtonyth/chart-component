import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const configs: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      bg: "gray.50",
      color: "gray.800",
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "md",
    },
    sizes: {
      sm: {
        fontSize: "12px",
        px: 4,
        py: 2,
      },
      md: {
        fontSize: "16px",
        px: 6,
        py: 3,
      },
      lg: {
        fontSize: "20px",
        px: 8,
        py: 4,
      },
    },
    variants: {
      solid: {
        bg: "#4B40EE",
        color: "white",
        _hover: {
          bg: "blue.600",
        },
        _active: {
          bg: "blue.700",
        },
      },
      outline: {
        border: "2px solid",
        borderColor: "#4B40EE",
        color: "#4B40EE",
        _hover: {
          bg: "blue.50",
        },
      },
      ghost: {
        color: "grey.400",
        _active: {
          bg: "#4B40EE",
          color: "white",
        },
      },
    },
  },
};

const theme = extendTheme({
  configs,
  styles,
  components,
});

export default theme;
