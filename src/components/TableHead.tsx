import {
  UnstyledButton,
  Group,
  Center,
  Text,
  createStyles,
} from "@mantine/core"
import { IconChevronUp, IconChevronDown, IconSelector } from "@tabler/icons"
import { ThProps } from "types"

export default function Th({ children, reversed, sorted, onSort }: ThProps) {
  const useStyles = createStyles((theme) => ({
    th: {
      padding: "0 !important",
      backgroundColor: theme.colors.gray[1],
    },

    control: {
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    },
  }))

  const { classes } = useStyles()
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector

  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          {onSort ? <Icon size={14} stroke={1.5} /> : null}
        </Group>
      </UnstyledButton>
    </th>
  )
}
