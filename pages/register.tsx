import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import InputField from "../components/input-field";
import { useRegisterMutation } from "../graphql/generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import toErrorMap from "../utils/errorMap";

const Register = () => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
        <Box mt={8} mx={'auto'} maxW={800} w={'100%'}>
            <Formik initialValues={{ username: '', password: '' }} onSubmit={async (values, { setErrors }) => {
                const response = await register(values);
                if (response.data?.register.errors) setErrors(toErrorMap(response.data.register.errors));
                else if (response.data?.register.user) router.push('/');
            }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="username" label="Username" />
                        <InputField name="password" label="Password" type="password" />
                        <Flex mt={4} justifyContent={'space-between'}>
                            <Button isLoading={isSubmitting} type="submit" colorScheme="teal">Register</Button>
                            <Button onClick={() => router.back()} colorScheme="red">Back</Button>
                        </Flex>

                    </Form>
                )}
            </Formik>
        </Box>

    )
}

export default withUrqlClient(createUrqlClient)(Register);