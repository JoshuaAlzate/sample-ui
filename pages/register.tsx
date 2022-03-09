import { FormControl, FormLabel, Input, FormHelperText, Box } from "@chakra-ui/react";
import { Formik } from "formik";

const Register = () => {
    return (
        <Box mt={8} mx={'auto'} maxW={800} w={'100%'}>
            <Formik initialValues={{ username: '', password: '' }} onSubmit={(values) => console.log(values)}>
                {() => (
                    <form>
                        <FormControl>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <Input id='username' type='text' />
                            {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                        </FormControl>
                    </form>
                )}
            </Formik>
        </Box>

    )
}

export default Register;