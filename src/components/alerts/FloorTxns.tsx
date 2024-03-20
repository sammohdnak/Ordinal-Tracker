"use client";

import React from "react";
import { getWatchlists } from "@/actions/handleWatchlist";
import { useCurrentUser } from "@/hooks/current-user";
import { useRouter } from "next/navigation";
import { Watchlist } from "@/components/watchlist/Table";
import { createAlertEntry } from "@/actions/createAlertEntry";
import {
  Table,
  Container,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  Avatar,
  FormControl,
  CircularProgress,
  Box,
} from "@mui/material";

interface FloorTxnsProps {
  setReload: React.Dispatch<React.SetStateAction<Boolean>>;
}

const FloorTxns: React.FC<FloorTxnsProps> = (props: FloorTxnsProps) => {
  const user = useCurrentUser();
  let userRef = React.useRef(user);

  const [isLoading, setIsLoading] = React.useState(true);
  const [watchlist, setWatchlist] = React.useState<Watchlist[]>([
    {
      name: "",
      image: "",
      collection_id: "",
      description: "",
    },
  ]);
  const router = useRouter();

  const [trackingType, setTrackingType] = React.useState("");
  const [refPrice, setRefPrice] = React.useState("");
  const [trackingDirection, setTrackingDirection] = React.useState("");
  const [trackingValue, setTrackingValue] = React.useState("");

  React.useEffect(() => {
    //get watchlist data from db - initial fetch
    const fetchData = async () => {
      const data: any = await getWatchlists(userRef);
      setIsLoading(false);
      if (data.error) {
        if (data.error === "Please login to view your watchlist") {
          alert(data.error);
          router.push("/auth/signin");
        }
        alert(data.error);
      }
      if (data.watchlists) {
        console.log("watchlist data in floor alerts component", data.watchlists);
        setWatchlist(data.watchlists);
        console.log(data.watchlists);
      }
    };
    fetchData();
  }, []);

  const setAlert = async () => {
    const alertData = {
      trackingType,
      refPrice,
      trackingDirection,
      trackingValue,
      watchlistId: watchlist[0].collection_id,
    };

    console.log("alertData sent to server", alertData);
    const result: any = await createAlertEntry(userRef, alertData);

    if (result.error) {
      alert(result.error);
      router.push("/auth/signin");
    }
    // props.setReload(true);
  };

  return isLoading ? (
    <>
      <Container
        disableGutters
        sx={{
          padding: "3%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: "75%",
        }}
      >
        <Typography variant="h4" component="h2" align="left" gutterBottom>
          Floor Alerts
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "40vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    </>
  ) : (
    <Container
      sx={{
        padding: "3%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minWidth: "75%",
      }}
    >
      <Typography variant="h4" component="h2" align="left" gutterBottom>
        Floor Alerts
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#000000",
          boxShadow: "0px 0px 1px 0px #c5c2f1",
          overflow: "hidden", // Add this to disable the scroll bar
        }}
      >
        <Table
          sx={{
            backgroundColor: "#000000",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Tracking Type</TableCell>
              <TableCell>Ref Price</TableCell>
              <TableCell>Tracking Direction</TableCell>
              <TableCell>Tracking Value(%)</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watchlist.map((item) => (
              <TableRow key={item.collection_id}>
                <TableCell
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    marginBottom: "-1.103px",
                  }}
                >
                  <Avatar src={item.image} alt={item.name} />
                  <Typography variant="body1">{item.name}</Typography>
                </TableCell>
                <TableCell>
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <InputLabel style={{ color: "#989a9c" }}>Choose</InputLabel>
                    <Select
                      label="Choose"
                      sx={{ width: "100%" }}
                      value={trackingType}
                      onChange={(e) => setTrackingType(e.target.value)}
                    >
                      <MenuItem value={"Percent Movement"}>
                        Percent Movement
                      </MenuItem>
                      <MenuItem value={"Absolute Value"}>
                        Absolute Value
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    label="Enter Price"
                    value={refPrice}
                    onChange={(e) => setRefPrice(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <InputLabel style={{ color: "#989a9c" }}>Choose</InputLabel>
                    <Select
                      label="Choose"
                      sx={{
                        width: "100%",
                      }}
                      value={trackingDirection}
                      onChange={(e) => setTrackingDirection(e.target.value)}
                    >
                      <MenuItem value={"Up"}>Up</MenuItem>
                      <MenuItem value={"Down"}>Down</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField
                    label="Enter Value"
                    value={trackingValue}
                    onChange={(e) => setTrackingValue(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={setAlert}
                  >
                    Set Alert
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FloorTxns;