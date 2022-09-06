import { Card, Container, MantineProvider } from "@mantine/core"
import ActionBar from "components/ActionBar"
import Table from "components/Table"
import theme from "./theme"

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Container>
        <Card shadow="sm" p="lg" m="xl" radius="md" withBorder>
          <ActionBar />
          <Table />
        </Card>
      </Container>
    </MantineProvider>
  )
}
