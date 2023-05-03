import { SearchIcon } from "@chakra-ui/icons";
import { Box, Card, CardBody, Flex, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import { useFormSearch, useBgImg } from "./formSearch.hooks";
import Link from "next/link";
import { ISearchAuto, SearchSuggestion } from "./search-auto.interface";
import { redirect } from 'next/navigation';

export default function SearchComponent() {
    const imgUrl = useBgImg();
    const [dataSearch, setDataSearch] = useState<ISearchAuto>({} as ISearchAuto);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { onChangeForm } = useFormSearch({ searchQuery, setSearchQuery }, { dataSearch, setDataSearch });

    const something = (event: any) => {
        if (event.keyCode === 13) {
            location.href = `/search/${searchQuery}`
        }
    }

    return (
        <>
            <Box w="100%" h="100%" bgSize={"cover"} opacity={"0.9"} bgImg={`url(${imgUrl})`}>
                <Flex flexDirection={"column"} height={"100vh"} alignItems={"center"} justifyContent={"center"}>
                    <Flex background={"white"} p={8} rounded={6} position={"relative"} width={"50%"} alignItems={"center"} justifyContent={"space-evenly"}>
                        <Box>
                            <Image priority src="/img/logo-bing.png" height={24} width={24} alt="bing" />
                        </Box>
                        <InputGroup mt={3} width={"90%"}>
                            <InputLeftElement pointerEvents="none" fontSize="1.5rem"><SearchIcon color="gray.400" /></InputLeftElement>
                            <Input type="search" placeholder="Ask me anything" size="lg" value={searchQuery} onChange={onChangeForm} onKeyDown={(e) => something(e)} />
                        </InputGroup>
                    </Flex>
                    {searchQuery && !!dataSearch?.suggestionGroups?.[0]?.searchSuggestions?.length && (
                        <>
                            <Card size={"sm"} p={"0 3rem 0 5rem"} bottom={".2rem"} borderTop="1px" borderColor="gray.300" rounded={"0 0 6px 6px"} position={"relative"} width={"50%"}>
                                <CardBody>
                                    {dataSearch.suggestionGroups[0].searchSuggestions.map((suggestionGroup: SearchSuggestion) => (
                                        <Link key={suggestionGroup.url} href={`/ search / ${suggestionGroup.displayText} `}>
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

