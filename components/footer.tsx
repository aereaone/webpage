import NextContainer from './container'
import { EXAMPLE_PATH } from '../lib/constants'
import {
  Container, Flex, Box, Heading, Text, Button, VStack,
  HStack, Wrap, WrapItem, FormControl, FormLabel, Input, 
  InputGroup, InputLeftElement, Textarea, Modal, ModalOverlay, 
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure
} from '@chakra-ui/react'
import { BsPerson } from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md'
import { useState } from 'react'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <NextContainer>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Connect with me.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <BasicModal/>
            <a
              href="https://instagram.com/aerea.lab"
              className="mx-3 font-bold hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </NextContainer>
    </footer>
  )
}

const BasicModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button bg="black" color="white" _hover={{color:"black", bg:"gray.100"}} onClick={onOpen}>Email</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='blackAlpha.300'backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent>
          {/* <ModalHeader></ModalHeader> */}
          <ModalCloseButton bg="black" color="white" _hover={{color:"black", bg:"gray.100"}} />
          <ModalBody>
            {/* <Text fontWeight='bold' mb='1rem'>
              You can scroll the content behind the modal
            </Text>
            <Lorem count={2} /> */}
            <ContactForm/>
          </ModalBody>
          {/* <ModalFooter>
            <Button bg="black" color="white" _hover={{color:"black", bg:"gray.100"}} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}

const ContactForm = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState("Send");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValidForm = handleValidation();
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: email,
        fullname: fullname,
        message: message,
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      console.log(error);
      return;
    }
    console.log(fullname, email, message);
  };

  return (
  <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" 
                            />}
                          />
                          <Input type="text" size="md" 
                            onChange={(e) => { setFullname(e.target.value);}} />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input type="text" size="md" 
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}/>
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          placeholder="message"
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          type="submit"
                          variant="solid"
                          bg="gray.800"
                          color="white"
                          _hover={{}}
                          onClick={handleSubmit}>
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
  )
}
export default Footer
