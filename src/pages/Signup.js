import React from "react";
import {
    Avatar,
    Container,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    //   Link,
    Grid,
    Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
// import { Link  } from "react-router-dom"
import { useForm } from "react-hook-form";
// import { useMutation } from "@apollo/client"
// import Notification from "../components/Notification"
import Loading from "../components/Loading";
import UserProvider from "../contexts/UserProvider";
// import { SIGNUP_INPUT } from "../graphql/graphql"
import Link from "../components/Link";
import useFetch from "use-http";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp(props) {
    const { handleSubmit, register, errors } = useForm();
    const classes = useStyles();
    const userCtx = React.useContext(UserProvider.context);
    //   const [errMsg, setErrMsg] = useState(null)
    //https://gotours-touring-app-101.herokuapp.com
    const { post, loading, error } = useFetch(`http://localhost:5000/api/v1/users`, {
        credentials: "include",
    });

    //   const [addUser, { loading }] = useMutation(SIGNUP_INPUT, {
    //     update(proxy, result) {
    //       console.log(result)
    //       userCtx.login(result.data.signup)
    //       // props.history.push("/");
    //       // window.open("/", "_self");
    //       window.close()
    //     },
    //     onError(err) {
    //       console.error(err)
    //       const message = err.graphQLErrors[0].message
    //       setErrMsg(message)
    //       return err
    //     },
    //   })

    if (loading) return <Loading />;
    if (error) return "ERROR :(";

    // React.useEffect(() => {
    //     if (userCtx.user) {
    //         window.open("/profile", "_self");
    //     }
    // });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const { name, email, password } = data;

            const res = await post("/signup", {
                name,
                email,
                password,
                confirmPassword: password,
            });
            userCtx.login({ ...res.data, token: res.token });
            props.history.push("/");
            // console.log(res);
        } catch (err) {
            console.error(err);
        }
    });

    return (
        // <TopLayout>
        <Container component="main" maxWidth="xs">
            {/* <Notification message={errMsg} /> */}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {/* <div style={{ marginTop: "1em" }}>
                    <Facebook setLoginRes={setLoginRes} />
                </div> */}

                <form className={classes.form} onSubmit={onSubmit} noValidate>
                    <TextField
                        autoComplete="name"
                        margin="normal"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        inputRef={register({
                            required: true,
                            minLength: 2,
                            maxLength: 20,
                        })}
                        error={errors.name && true}
                        helperText={errors.name && "Name is required"}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        inputRef={register({
                            required: true,
                            pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i,
                        })}
                        error={errors.email && true}
                        helperText={errors.email && "A valid email is required"}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={register({
                            required: true,
                            minLength: 10,
                            maxLength: 50,
                        })}
                        error={errors.password && true}
                        helperText={
                            errors.password &&
                            "Password must be minimum twelve characters"
                        }
                    />

                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link variant="body2" to="/login">
                            Already have an account? Log in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
        // </TopLayout>
    );
}
