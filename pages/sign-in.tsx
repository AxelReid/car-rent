import { upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Center,
  Card,
} from "@mantine/core";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import requests from "requests";

interface Values {
  email: string;
  username: string;
  password: string;
  re_password: string;
}
type SubmitType = "login" | "register";

const SignIn = () => {
  const router = useRouter();
  const { query } = router;
  const [loading, setLoading] = useState(false);
  const isRegister = query.type === "register";

  const switchPage = () => {
    if (query.type === "register") delete query.type;
    else query.type = "register";
    router.push({ pathname: router.pathname, query });
  };

  const form = useForm({
    initialValues: {
      email: "test@gmail.com",
      username: "",
      password: "1234567",
      re_password: "1234567",
      terms: true,
    },

    validate: {
      username: (val) => (!val && isRegister ? "Choose a username" : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      re_password: (val, values) =>
        isRegister && val !== values.password ? "Passwords don't match" : null,
    },
  });

  const submit = async (values: Values, submitType?: SubmitType) => {
    setLoading(true);

    try {
      if (submitType === "login" || !isRegister) {
        const res = await requests.auth.login({
          email: values.email,
          password: values.password,
        });
        const token = res.data?.auth_token;

        setCookie("token", token, {
          //maxAge: 60 * 6 * 24,
          //secure: true,
        });
        router.push("/dashboard");
      } else {
        await requests.auth.signup({
          email: values.email,
          username: values.username,
          password: values.password,
          re_password: values.re_password,
        });

        showNotification({
          message:
            "You have created an account successfully! Now logging in...",
          color: "green",
        });
        const data = values;
        switchPage();
        return setTimeout(async () => {
          await submit(data, "login");
        }, 1000);
      }
    } catch (error: any) {
      let message: any = "";

      if (isRegister) {
        message = Object.values(error.response.data)[0];
      } else {
        message = error.response?.data?.non_field_errors[0];
      }

      showNotification({
        message,
        color: "red",
      });
    }

    setLoading(false);
  };

  return (
    <Center sx={{ height: "100vh" }} px="md">
      <Card radius="md" p="xl" withBorder shadow="md" style={{ width: 370 }}>
        <Text size="lg" weight={500} mb="xl">
          Welcome to Morent
        </Text>

        <form onSubmit={form.onSubmit((vals) => submit(vals, undefined))}>
          <Stack>
            {isRegister && (
              <TextInput
                label="Username"
                placeholder="Enter username"
                {...form.getInputProps("username")}
              />
            )}

            <TextInput
              label="Email"
              placeholder="example@email.com"
              value={form.values.email}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
            />

            {isRegister && (
              <>
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm password"
                  {...form.getInputProps("re_password")}
                />
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  {...form.getInputProps("terms")}
                />
              </>
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => switchPage()}
              size="xs"
            >
              {isRegister
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" loading={loading}>
              {upperFirst(isRegister ? "register" : "login")}
            </Button>
          </Group>
        </form>
      </Card>
    </Center>
  );
};

export default SignIn;
