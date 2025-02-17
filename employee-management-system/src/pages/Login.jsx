import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Link,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    try {
      console.log("Signing In...", formData);
      // Replace this with an actual API call
      alert(`Welcome back, ${formData.email}!`);
      navigate("/user");
    } catch (error) {
      console.error("Sign In Error:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      console.log("Signing Up...", formData);
      // Replace this with an actual API call
      alert(`Account created for ${formData.email}`);
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignUp ? handleSignUp() : handleSignIn();
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
          <Avatar sx={{ margin: "auto", bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </>
            )}

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <Typography variant="body2" sx={{ marginTop: 2 }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              component="button"
              onClick={() => setIsSignUp(!isSignUp)}
              sx={{ cursor: "pointer" }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
