import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/input-field";
import { useRegisterMutation } from "../graphql/generated/graphql";
import toErrorMap from "../utils/errorMap";

const Register = () => {
  const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
        <Box mt={8} mx={'auto'} maxW={800} w={'100%'}>
            <Formik initialValues={{ username: '', password: '' }} onSubmit={async (values, { setErrors }) => {
                const response = await register(values);
                if(response.data?.register.errors) setErrors(toErrorMap(response.data.register.errors));
                else if (response.data?.register.user) router.push('/');
            }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="username" label="Username" />
                        <InputField name="password" label="Password" type="password" />
                        <Button mt={4} isLoading={isSubmitting} type="submit" colorScheme="teal">Register</Button>
                    </Form>
                )}
            </Formik>
        </Box>

    )
}

export default Register;