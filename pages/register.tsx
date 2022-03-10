import { FormControl, FormLabel, Input, FormHelperText, Box } from "@chakra-ui/react";
import { Formik } from "formik";
import InputField from "../components/input-field";

const Register = () => {
    return (
        <Box mt={8} mx={'auto'} maxW={800} w={'100%'}>
            <Formik initialValues={{ username: '', password: '' }} onSubmit={(values) => console.log(values)}>
                {() => (
                    <form>
                        <InputField name="username" label="Username"/>
                        <InputField name="password" label="Password" type="password" />
                    </form>
                )}
            </Formik>
        </Box>

    )
}

export default Register;