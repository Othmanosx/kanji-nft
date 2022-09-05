import { MantineTheme } from "@mantine/core"

const theme = {
  defaultRadius: "md",
  components: {
    Button: {
      styles: (theme: MantineTheme) => ({
        root: {
          boxShadow: theme.shadows.xs,
        },
      }),
    },
    Input: {
      styles: (theme: MantineTheme) => ({
        input: {
          boxShadow: theme.shadows.sm,
        },
      }),
    },
  },
}

export default theme
