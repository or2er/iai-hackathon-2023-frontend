// import type { NextPage } from "next";
import React from "react";
// var request = require('request');
import { Container, Typography, Box, Button, Avatar, Tab } from "@mui/material";
// import TabContext from '@mui/lab/TabContext';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import GameCard from "../../common/GameCard/GameCard";
import TaskCard from "../../common/TaskCard/TaskCard";

// Images
import cat from "../../assets/images/cat.jpg";
import gem from "../../assets/images/gem.png";
import login_bg from "../../assets/images/login_bg.jpg";
import wizard_staff from "../../assets/images/wizard_staff.png";
import holy_rope from "../../assets/images/holy_rope.png";

const Index = () => {
  const [value, setValue] = React.useState("2");
  const [uData, setuData] = React.useState("");
  const [storage, setStorage] = React.useState("");
  const [room, setRoom] = React.useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(localStorage.getItem("uid"))

  React.useEffect(() => {
    fetch("http://127.0.0.1:5678/user/get", {
      method: "POST",
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
        data: localStorage.getItem("uid"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        setuData(json.data);
      });

    fetch("http://127.0.0.1:5678/storage/get", {
      method: "POST",
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("storage", json.data);
        setStorage(json.data);
      });

    fetch("http://127.0.0.1:5678/group/all/rooms", {
      method: "POST",
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log("all rooms: ", json.data);
        console.log("all rooms", Object.values(json.data));
        setRoom(Object.values(json.data));
      });
  }, []);

  return (
    <>
      <Box
        component="section"
        className="DashboardSection"
        sx={(theme) => ({
          backgroundColor: "#F0F4FF",
        })}
      >
        <Container maxWidth="xl" sx={{ padding: "0 2% !important" }}>
          {/* User Banner */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.60)), url(${login_bg.src})`,
              padding: "24px",
              paddingTop: "128px",
              borderRadius: "16px",
              backgroundSize: "cover",
              justifyContent: "space-between",
              marginTop: "56px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "16px",
              }}
            >
              <Avatar
                alt="ava"
                src={`${cat.src}`}
                sx={{
                  width: "72px",
                  height: "72px",
                  border: "2px solid #fff",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#fff",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  {uData.uname ? uData.uname : "No data yet"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fff",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {uData.email ? uData.email : "No data yet"}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {storage.balance}
              </Typography>
              <Image src={gem} alt="gem" width={36} height={36} />
            </Box>
          </Box>
          {/* User Banner */}

          {/* Game Section */}
          <Grid container spacing={8} pt={4}>
            <Grid xs={8}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Previous Game" value="1" />
                    <Tab label="Group Game" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{ padding: "24px 0" }}>
                  <Grid container spacing={4}>
                    <Grid xs={6}>
                      <GameCard
                        img_src={login_bg}
                        title={"Giải tích I"}
                        description={"Giải quyết những bài toán hóc búa"}
                        code={"54624562"}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>

                <TabPanel value="2" sx={{ padding: "24px 0" }}>
                  <Grid container spacing={4}>
                    {room && room.map((item, key) => {
                      return (
                        <GameCard
                          img_src={login_bg}
                          title={"Giải tích I"}
                          description={"Giải quyết những bài toán hóc búa"}
                          code={item}
                          data={item}
                          key={key}
                        />
                      )
                    })}
                  </Grid>
                </TabPanel>
              </TabContext>
            </Grid>
            {/* Game Section */}

            {/* Daily Tasks Section */}
            <Grid xs={4}>
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#E8E8E9",
                  padding: "24px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  Daily Tasks
                </Typography>

                {/* Tasks */}
                <Box
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <TaskCard
                    img_src={wizard_staff}
                    title={"Complete one game"}
                    description={"Reward: Wizard Staff"}
                  />
                  <TaskCard
                    img_src={holy_rope}
                    title={"Kill boss under 10 minutes"}
                    description={"Reward: Holy Rope"}
                  />
                  <TaskCard
                    img_src={holy_rope}
                    title={"Kill boss under 10 minutes"}
                    description={"Reward: Holy Rope"}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Index;
