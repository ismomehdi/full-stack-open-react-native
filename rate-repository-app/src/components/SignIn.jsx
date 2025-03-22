import { useFormik } from "formik";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";

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
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isUsernameInvalid = formik.touched.username && formik.errors.username;
  const isPasswordInvalid = formik.touched.password && formik.errors.password;

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
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
