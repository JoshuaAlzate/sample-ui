import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/input-field";
import { useLoginMutation } from "../graphql/generated/graphql";
import toErrorMap from "../utils/errorMap";

const Login = () => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Box mt={8} mx={'auto'} maxW={800} w={'100%'}>
            <Formik initialValues={{ username: '', password: '' }} onSubmit={async (credentials, { setErrors }) => {
                const response = await login({ credentials });
                if (response.data?.login.errors) setErrors(toErrorMap(response.data.login.errors));
                else if (response.data?.login.user) router.push('/');
            }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="username" label="Username" />
                        <InputField name="password" label="Password" type="password" />
                        <Button mt={4} isLoading={isSubmitting} type="submit" colorScheme="teal">Login</Button>
                    </Form>
                )}
            </Formik>
        </Box>

    )
}

export default Login;