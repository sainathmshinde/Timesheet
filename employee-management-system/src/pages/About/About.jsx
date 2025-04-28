import React from "react";
import { Link } from "react-router-dom";
import WithLayout from "../../components/layout/WithLayout";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

const cardData = [
  { id: 1, title: "Users", count: "10", path: "/user" },
  { id: 2, title: "Projects", count: "20", path: "/projects" },
  { id: 3, title: "Sprints", count: "78", path: "/sprint" },
  { id: 4, title: "Tasks", count: "178", path: "/tasks" },
  { id: 5, title: "Subtasks", count: "378", path: "/subtask" },
];

const About = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <Link to={card.path} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  height: "100%",
                  minHeight: 140,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                  boxShadow: 2,
                  transition: "0.3s",
                  backgroundColor: blue,

                  "&:hover": {
                    boxShadow: 5,
                    transform: "translateY(-4px)",
                  },
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 400, textAlign: "center" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ fontWeight: "bold", textAlign: "center", mt: 1 }}
                  >
                    {card.count}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WithLayout(About);
