import { MantineTheme, MantineThemeOverride } from "@mantine/core"

const theme: MantineThemeOverride = {
  components: {
    Button: {
      styles: (theme: MantineTheme) => ({
        root: {
          boxShadow: theme.shadows.xs,
          borderRadius: theme.radius.md,
        },
      }),
    },
    Input: {
      styles: (theme: MantineTheme) => ({
        input: {
          boxShadow: theme.shadows.xs,
          borderRadius: theme.radius.md,
        },
      }),
    },
    Badge: {
      styles: () => ({
        root: {
          paddingLeft: "3px",
          paddingRight: "3px",
          textTransform: "none",
        },
      }),
    },
    Avatar: {
      styles: (theme: MantineTheme) => ({
        root: {
          borderRadius: theme.radius.md,
        },
      }),
    },
    Table: {
      styles: (theme: MantineTheme) => ({
        root: {
          "tr:hover": {
            backgroundColor: theme.colors.gray[1],
          },
        },
      }),
    },
  },
}

export default theme
