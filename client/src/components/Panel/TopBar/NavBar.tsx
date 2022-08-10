import React from 'react';
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function UserMenu() {
    return (
        <Menu>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
            </MenuButton>
            <MenuList alignItems={'center'}>
                <br />
                <Center>
                    <Avatar
                        size={'2xl'}
                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                </Center>
                <br />
                <Center>
                    <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
            </MenuList>
        </Menu>
    );
}

function LoginSection() {
    const navigate = useNavigate();
    return <Stack
        flex={{ base: 1, md: 0 }}
        justify={'flex-end'}
        direction={'row'}
        spacing={6}>
        <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            onClick={() => navigate('/signin')}
        >
            Sign In
        </Button>
        <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            _hover={{
                bg: 'pink.300',
            }}
            onClick={() => navigate('/signup')}
        >
            Sign Up
        </Button>
    </Stack>;
}

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    const isLoggedIn = false;
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>Game</Box>

                    <div className='flex'>
                        <Flex alignItems={'center'} className='mr-5'>
                            <Stack direction={'row'} spacing={7}>
                                <Button onClick={toggleColorMode}>
                                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                </Button>

                            </Stack>
                        </Flex>

                        {isLoggedIn ? <UserMenu /> : <LoginSection />}
                    </div>
                </Flex>
            </Box>
        </>
    );
}