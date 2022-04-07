import { Box, Link, Flex, Text, Button } from "@chakra-ui/react";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../graphql/generated/graphql";
import { isServer } from "../utils/isServer";

const NavBar = () => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data: meData }] = useMeQuery({
        pause: isServer()
    });
    const router = useRouter();

    const logoutAction = async () => {
        const logoutResponse = await logout();
        // if(logoutResponse.data?.logout) router.reload();
    }
    let navigationBody = null;
    if (meData?.me?.user) {
        navigationBody = (
            <>
                <NextLink href={'/login'}>
                    <Link verticalAlign={'middle'}>{meData.me.user?.username}</Link>
                </NextLink>
                <Button onClick={async () => await logoutAction()} isLoading={logoutFetching}>Logout</Button>
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