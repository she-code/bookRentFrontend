import { Box, Container, Grid, Button } from "@mui/material";
import { MenuBookOutlined } from "@mui/icons-material";
import Logo from "../../../components/Typography/Logo";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomText from "../../../components/Typography/CustomText";
import { signUpUser } from "../authActions";
import { useAppDispacth, useAppSelector } from "../../../app/hooks";
import CustomTextField from "../../../components/TextField/Custom_TextField";
import {
  setConfPassword,
  setEmail,
  setFirstName,
  setLastName,
  setLocation,
  setPassword,
  setPhoneNumber,
} from "../authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const schema = z
    .object({
      firstName: z.string().nonempty("First name is required"),
      lastName: z.string().nonempty("Last name is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confpassword: z.string().min(6, "Password must be at least 6 characters"),
      location: z.string().nonempty("Location is required"),
      phoneNumber: z
        .string()
        .nonempty("Phone number is required")
        .regex(/^\d{10}$/, "Invalid phone number"),
    })
    .refine((data) => data.password === data.confpassword, {
      message: "Passwords don't match",
      path: ["confpassword"], // path of the error in the form
    });

  const dispatch = useAppDispacth();
  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    location,
    email,
    password,
    confPassword,
    phoneNumber,
  } = useAppSelector((state) => state.auth);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form data
    const result = schema.safeParse({
      firstName,
      lastName,
      email,
      password,
      confpassword: confPassword,
      location: "chennai",
      phoneNumber,
    });

    if (result.success) {
      // If validation succeeds, dispatch the action
      try {
        const response = await dispatch(
          signUpUser({
            firstName,
            lastName,
            location: "chennai",
            email,
            password,
            confPassword,
            phoneNumber,
          })
        ).unwrap();
        console.log({ resp: response.message, code: response.statusCode });
        if (response.statusCode === 200) {
          localStorage.setItem("token", response.token);
          navigate("/");
        }
        setErrors({});
      } catch (error) {
        console.log({ error });
      }

      // Clear errors on successful submission
    } else {
      // Handle validation errors
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) {
          fieldErrors[path] = issue.message;
        }
      });
      console.log({ fieldErrors });
      setErrors(fieldErrors);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          width={"100%"}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Grid
            item
            bgcolor={"#171B36"}
            md={6}
            xs={4}
            textAlign={"center"}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <MenuBookOutlined
              sx={{ color: "white", width: "150px", height: "150px" }}
            />
          </Grid>
          <Grid item xs={8} md={6} p={6}>
            <Logo my={4} />
            <CustomText
              text="Signup as Owner"
              fontSize={22}
              fontWeight={200}
              mb={2}
              color="#555"
            />
            <form onSubmit={handleSubmit}>
              <CustomTextField
                placeholder="John"
                label="First Name"
                type="text"
                error={!!errors.firstName}
                helperText={errors.firstName as string}
                name={"firstName"}
                value={firstName}
                handleInputChangeCB={(e) => {
                  dispatch(setFirstName(e.target.value));
                }}
              />

              <CustomTextField
                placeholder="Doe"
                label="Last Name"
                type="text"
                // error={!!errors.lastName}
                // helperText={errors.lastName?.message as string}
                name={"lastName"}
                value={lastName}
                handleInputChangeCB={(e) => {
                  dispatch(setLastName(e.target.value));
                }}
              />

              <CustomTextField
                placeholder="john@gmail.com"
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email}
                name={"email"}
                value={email}
                handleInputChangeCB={(e) => {
                  dispatch(setEmail(e.target.value));
                }}
              />

              <CustomTextField
                placeholder="********"
                label="Password"
                type="password"
                // error={!!errors.password}
                // helperText={errors.password?.message as string}
                name={"password"}
                value={password}
                handleInputChangeCB={(e) => {
                  dispatch(setPassword(e.target.value));
                }}
              />

              <CustomTextField
                placeholder="********"
                label="Confirm Password"
                type="password"
                // error={!!errors.confpassword}
                // helperText={errors.confpassword?.message as string}
                name={"confPassword"}
                value={confPassword as string}
                handleInputChangeCB={(e) => {
                  dispatch(setConfPassword(e.target.value));
                }}
              />

              <CustomTextField
                placeholder=""
                label="Location"
                type="text"
                //  error={!!errors.location}
                //   helper Text={errors.location?.message as string}
                name={"location"}
                value={"location"}
                handleInputChangeCB={(e) => {
                  setLocation(e.target.value);
                }}
              />

              <CustomTextField
                placeholder="09********"
                label="Phone Number"
                type="tel"
                // error={!!errors.phoneNumber}
                // helperText={errors.phoneNumber?.message as string}
                name={"phoneNumber"}
                value={phoneNumber}
                handleInputChangeCB={(e) => {
                  dispatch(setPhoneNumber(e.target.value));
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                // onClick={handleSubmit(onSubmit)}
                sx={{ mt: 4, bgcolor: "#00ABFF" }}
              >
                Sign Up
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
