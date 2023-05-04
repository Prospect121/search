import { SearchIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, Flex, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import { useFormSearch, useBgImg } from "./formSearch.hooks";
import Link from "next/link";
import { ISearchAuto, SearchSuggestion } from "./search-auto.interface";
import { useRouter } from "next/router";

export default function SearchComponent() {
    const imgUrl = useBgImg();
    const [dataSearch, setDataSearch] = useState<ISearchAuto>({} as ISearchAuto);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { onChangeForm } = useFormSearch({ searchQuery, setSearchQuery }, { dataSearch, setDataSearch });

    const onkeyEnter = (event: any) => {
        if (event.keyCode === 13) {
            router.push(`/search/${searchQuery}`);
        }
    }
    const router = useRouter();

    return (
        <>
            <Box w="100%" h="100%" bgSize={"cover"} opacity={"0.9"} bgImg={`url(${imgUrl})`}>
                <Flex flexDirection={"column"} height={"100vh"} alignItems={"center"} justifyContent={"center"}>
                    <Flex background={"white"} p={{ base: '2', md: '4', xl: '8' }} rounded={6} position={"relative"} alignItems={"center"} justifyContent={"space-evenly"}
                        width={{
                            base: '100%',
                            md: '50%',
                            xl: '50%',
                        }}>
                        <Box width={"24px"} height={"24px"} position={"relative"}>
                            <Image src="/img/logo-bing.png" fill alt="bing" sizes='24px' />
                        </Box>
                        <InputGroup mt={3} width={"90%"}>
                            <InputLeftElement pointerEvents="none" fontSize="1.5rem"><SearchIcon color="gray.400" /></InputLeftElement>
                            <Input type="search" placeholder="Ask me anything" size="lg" value={searchQuery} onChange={onChangeForm} onKeyDown={(e) => onkeyEnter(e)} />
                        </InputGroup>
                    </Flex>
                    {searchQuery && !!dataSearch?.suggestionGroups?.[0]?.searchSuggestions?.length && (
                        <>
                            <Card size={"sm"} p={{ base: '0 .5rem 0 .5rem', md: '0 3rem 0 5rem', xl: "0 3rem 0 5rem" }} bottom={".2rem"} borderTop="1px" borderColor="gray.300" rounded={"0 0 6px 6px"} position={"relative"}
                                width={{
                                    base: '100%',
                                    md: '50%',
                                    xl: '50%',
                                }}>
                                <CardBody>
                                    {dataSearch.suggestionGroups[0].searchSuggestions.map((suggestionGroup: SearchSuggestion) => (
                                        <Link key={suggestionGroup.url} href={`/search/${suggestionGroup.displayText}`}>
                                            <Text fontSize="1.2rem" marginBottom={"0.4rem"}>
                                                <SearchIcon color="gray.400" marginRight={".8rem"} />
                                                {suggestionGroup.displayText}
                                            </Text>
                                        </Link>

                                    ))}
                                </CardBody>
                            </Card>
                        </>
                    )}
                </Flex>
            </Box>
        </>
    );
}

