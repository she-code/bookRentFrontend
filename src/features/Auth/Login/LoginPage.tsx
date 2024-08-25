import { Container, Grid, Box, Typography } from "@mui/material";
import CustomTextField from "../../../components/TextField/Custom_TextField";
import CustomText from "../../../components/Typography/CustomText";
import CustomButton from "../../../components/Button/CustomButton";
import { MenuBookOutlined } from "@mui/icons-material";
import Logo from "../../../components/Typography/Logo";
import { Link, useNavigate } from "raviger";
import { useAppDispacth, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { loginUser } from "../authActions";
import { setEmail, setPassword } from "../authSlice";
import { z } from "zod";

// import CustomTextField from "../../components/TextField/Custom_TextField";

export default function LoginPage() {
  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const dispatch = useAppDispacth();
  const navigate = useNavigate();

  const { email, password } = useAppSelector((state) => state.auth);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form data
    const result = schema.safeParse({
      email,
      password,
    });

    if (result.success) {
      // If validation succeeds, dispatch the action
      try {
        setLoading(true);
        const response = await dispatch(
          loginUser({ email, password })
        ).unwrap();
        console.log({ resp: response.message, code: response.statusCode });
        if (response.statusCode === 200) {
          localStorage.setItem("token", response.token);
          setLoading(false);
          navigate("/");
        } else {
          setErrorMessage(response.message);
          setLoading(false);
        }
        setErrors({});
      } catch (error) {
        console.log({ error });
        setLoading(false);
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
              text="Sign In"
              fontSize={22}
              fontWeight={200}
              mb={2}
              color="#555"
            />
            {errorMessage ? (
              <CustomText
                text={errorMessage as string}
                fontSize={18}
                color="red"
                fontWeight={200}
              />
            ) : (
              <></>
            )}
            <form onSubmit={handleSubmit}>
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
                error={!!errors.password}
                helperText={errors.password as string}
                name={"password"}
                value={password}
                handleInputChangeCB={(e) => {
                  dispatch(setPassword(e.target.value));
                }}
              />
              <CustomButton
                text={loading ? "Please wait..." : "Sign In"}
                variant="contained"
                mt={4}
                bgColor="#00ABFF"
              />
            </form>
            <Typography mt={3}>
              <Link href={"/signup"}> Create account instead.</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
