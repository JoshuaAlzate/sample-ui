import { Box, Link, Flex, Text, Button } from "@chakra-ui/react";
import NextLink from 'next/link';
import { useMeQuery } from "../graphql/generated/graphql";

const NavBar = () => {
    const [{ data, fetching }] = useMeQuery();
    let navigationBody = null;
    if (data?.me.user) {
        navigationBody = (
            <>
                <Link verticalAlign={'middle'}>{data.me.user?.username}</Link>
                <Button>Logout</Button>
            </>
        );
    } else {
        navigationBody = (
            <>
                <NextLink href={'/login'}>
                    <Link mr={4}>Login</Link>
                </NextLink>
                <NextLink href={'/register'}>
                    <Link>Register</Link>
                </NextLink>
            </>
        );
    }
    return (
        <>
            <Flex borderBottom='1px' borderColor='gray.200'>
                <Box p={5} ml={'auto'}>
                    {navigationBody}
                </Box>
            </Flex>
        </>
    );
}

export default NavBar;