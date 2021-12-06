import "./app.css";
import Chart from "./components/chart";
import Map from "./components/map";
import Appbar from "./components/controls/Appbar";
import { Container, Box } from "@mui/material";

function App() {
  return (
    <Container maxWidth={false} sx={{ padding: 0 }}>
      <Appbar />
      <Box sx={{ width: "100vw", height: "700px" }}>
        <Chart />
      </Box>
      <Map />
    </Container>
  );
}

export default App;
