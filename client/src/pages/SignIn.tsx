import React from 'react';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signIn = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const result = await fetch('http://localhost:3002/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        });

        const data = await result.json();
        console.log(data);
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Heading fontSize={'4xl'} textAlign={'center'} >
                    Sign in
                </Heading>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4} w={96}>
                        <Box>
                            <FormControl id="firstName">
                                <FormLabel>Nickname</FormLabel>
                                <Input type="text" value={name} onChange={e => setName(e.target.value)} />
                            </FormControl>
                        </Box>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={'pink.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'pink.500',
                                }}
                                onClick={signIn}
                            >
                                Sign in
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Don`t have an account? <Link color={'pink.400'} onClick={() => navigate('/signup')}>Sign Up</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}