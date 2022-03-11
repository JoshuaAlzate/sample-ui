import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/input-field";

const Register = () => {
    return (
        <Box mt={8} mx={'auto'} maxW={800} w={'100%'}>
            <Formik initialValues={{ username: '', password: '' }} onSubmit={(values) => { console.log(values) }}>
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