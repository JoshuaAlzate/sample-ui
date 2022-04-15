import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import InputField from "../../components/input-field";
import { useChangePasswordMutation } from "../../graphql/generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import toErrorMap from "../../utils/errorMap";


const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    return (
        <Box mt={8} mx={'auto'} maxW={800} w={'100%'}>
            <Formik initialValues={{ newPassword: '', confirmPassword: '' }} onSubmit={async (values, { setErrors }) => {
                if (values.newPassword !== values.confirmPassword) {
                    setErrors({ confirmPassword: 'Password should be match' });
                    return;
                }
                const response = await changePassword({
                    token,
                    newPassword: values.newPassword
                });
                if (response.data?.changePassword.errors) setErrors(toErrorMap(response.data.changePassword.errors));
                else if (response.data?.changePassword.user) router.push('/');
            }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name="newPassword" label="Password" type="password" />
                        <InputField name="confirmPassword" label="Confirm Password" type="password" />
                        <Flex mt={4} justifyContent={'space-between'}>
                            <Button isLoading={isSubmitting} type="submit" colorScheme="teal">Change Password</Button>
                            <Button onClick={() => router.back()} colorScheme="red">Back</Button>
                        </Flex>

                    </Form>
                )}
            </Formik>
        </Box>
    )
}

ChangePassword.getInitialProps = ({ query }) => {
    console.log(query);
    const token = query.token as string;
    return { token }
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);