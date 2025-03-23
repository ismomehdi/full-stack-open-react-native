import { useFormik } from "formik";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import useReview from "../hooks/useReview";
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
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Username is required"),
  repositoryName: yup.string().required("Password is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
  text: yup.string(),
});

const Review = () => {
  const navigate = useNavigate();
  const [review] = useReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const res = await review({ ownerName, repositoryName, rating, text });
      console.log({ res });
      navigate(`/repository/${res.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <InputField
        name="ownerName"
        placeholder="Repository owner name"
        formik={formik}
      />
      <InputField
        name="repositoryName"
        placeholder="Repository name"
        formik={formik}
      />
      <InputField
        name="rating"
        placeholder="Rating between 0 and 100"
        formik={formik}
      />
      <InputField multiline name="text" placeholder="Review" formik={formik} />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const InputField = ({ name, placeholder, formik, ...props }) => {
  const isError = formik.touched[name] && formik.errors[name];
  return (
    <View>
      <TextInput
        {...props}
        style={[
          styles.input,
          isError ? { borderColor: "red" } : { borderColor: "black" },
        ]}
        placeholder={placeholder}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
      />
      {isError && <Text style={{ color: "red" }}>{formik.errors[name]}</Text>}
    </View>
  );
};

export default Review;
