import { Box, Button, Flex } from "@chakra-ui/react";

const NavBar = () => {
    return (
        <>
            <Flex borderBottom='1px' borderColor='gray.200'>
                <Box p={5} ml={'auto'}>
                    <Button>Login</Button>
                    <Button>Register</Button>
                </Box>
            </Flex>
        </>
    );
}

export default NavBar;