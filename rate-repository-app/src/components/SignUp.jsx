import { useFormik } from "formik";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import theme from "../theme";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    gap: 20,
  },
  input: {
    borderColor: theme.colors.textSecondary,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
  },
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("Username is required"),
  password: yup.string().min(5).max(30).required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [SignIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await SignIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isUsernameInvalid = formik.touched.username && formik.errors.username;
  const isPasswordInvalid = formik.touched.password && formik.errors.password;
  const isPasswordConfirmationInvalid =
    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation;

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          secureTextEntry
          style={[
            styles.input,
            isUsernameInvalid
              ? { borderColor: "red" }
              : { borderColor: "black" },
          ]}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
        {isUsernameInvalid && (
          <Text style={{ color: "red" }}>{formik.errors.username}</Text>
        )}
      </View>
      <View>
        <TextInput
          secureTextEntry
          style={[
            styles.input,
            isPasswordInvalid
              ? { borderColor: "red" }
              : { borderColor: "black" },
          ]}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        {isPasswordInvalid && (
          <Text style={{ color: "red" }}>{formik.errors.password}</Text>
        )}
      </View>
      <View>
        <TextInput
          secureTextEntry
          style={[
            styles.input,
            isPasswordInvalid
              ? { borderColor: "red" }
              : { borderColor: "black" },
          ]}
          placeholder="Password confirmation"
          value={formik.values.passwordConfirmation}
          onChangeText={formik.handleChange("passwordConfirmation")}
        />
        {isPasswordConfirmationInvalid && (
          <Text style={{ color: "red" }}>
            {formik.errors.passwordConfirmationsadsafa}
          </Text>
        )}
      </View>
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
