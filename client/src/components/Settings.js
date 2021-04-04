import React from 'react'
import {Button, Center, Container, Flex, Spacer, Text} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import LocationSelector from './LocationSelector'
import ColorModeSelector from './ColorModeSelector'

export default function Settings() {

function handleClose() {
    window.location = "/"
}

    return (
        <div>
            <Flex>
              <Text fontSize="30px"m="20px" p="5px" px="18px" borderBottomWidth="3.5px" borderColor="#39F969">Settings</Text>
            <Spacer/>
            <Center>
            <Button mr="30px" p="0" onClick={handleClose}><CloseIcon/></Button>
            </Center>
            </Flex>

            <Container mt="40px"height="60vw">
                <Flex>
                    <Center>
                    <Text>Select Recycling Facility</Text>
                    </Center>
                    <Spacer/>
                    <LocationSelector/>
                </Flex>
                <Flex mt="10px">
                    <Center>
                    <Text>Color Mode</Text>
                    </Center>
                    <Spacer/>
                    
                    <ColorModeSelector/>
                    
                    
                </Flex>
    
                <Center mt="100%">
                <Text color="gray.300" alignItems="end">Build: v0.4 (Beta) 04/4/2021</Text>
                </Center>
            </Container>
            
        </div>
    )
}
