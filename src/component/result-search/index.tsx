"use client";
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { FC, useCallback, useState } from "react";
import { ISearch, ValueElement } from "@/component/result-search/search.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useResultsSearch, usePagination, IPagination, useResultsSearchEffect } from "./resultsSearch.hooks";

interface ResultSearchProps {
    query: string;
}

export const ResultSearch: FC<ResultSearchProps> = ({ query }) => {
    const [dataSearch, setDataSearch] = useState<ISearch>();
    const [searchQuery, setSearchQuery] = useState<string>(query.toString());
    const [pagination, setPagination] = useState(usePagination(1, 11));
    let total = dataSearch?.webPages?.totalEstimatedMatches ?? 0;

    useResultsSearchEffect(searchQuery, 0, { dataSearch, setDataSearch })

    const SetData = (value: number, total: number, pagination: IPagination) => {
        useResultsSearch(searchQuery, value, { dataSearch, setDataSearch })
        setPagination(usePagination(value, total, pagination.paginations, pagination.current));
    }

    const handleChangePagination = useCallback(
        (e: any, value: number, total: number, pagination: IPagination) => {
            e.preventDefault()
            SetData(value, total, pagination);
        },
        []
    )

    const onkeyEnter = (event: any) => {
        if (event.keyCode === 13) {
            location.href = '';
            location.href = `/search/${searchQuery}`;
        }
    }

    const onChangeForm = (event: any) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            {query ? (
                <Box w="100%" h="100%" bgGradient="linear(to-t, green.200, pink.500)" bgSize={"cover"} opacity={"0.9"}>
                    <Flex direction={"column"} height={"100vh"} alignItems={"baseline"} justifyContent={"left"} pt="0rem">
                        <Flex background={"white"} p={{ base: '2', md: '4', xl: '8' }} position={"relative"} width={"100%"} alignItems={"center"}>
                            <Box mr={"1rem"} width={"24px"} height={"24px"} position={"relative"}>
                                <Image src="/img/logo-bing.png" fill alt="bing" sizes='24px' />
                            </Box>
                            <InputGroup mt={3} width={{
                                base: '100%',
                                md: '50%',
                                xl: '50%',
                            }} >
                                <InputLeftElement pointerEvents="none" fontSize="1.5rem" ><SearchIcon color="gray.400" /></InputLeftElement>
                                <Input type="search" placeholder="Ask me anything" size="lg" value={searchQuery} onChange={onChangeForm} onKeyDown={(e) => onkeyEnter(e)} />
                            </InputGroup>
                        </Flex>

                        <Flex direction={"column"} height={"100vh"} bgColor="white" p={{ base: '2', md: '4', xl: '8' }} pl={{ base: '1rem', md: '3rem', xl: '5rem' }} position={"relative"} width={"100%"} borderTop="1px" borderColor="gray.300">

                            {!!dataSearch?.webPages && !!dataSearch?.webPages?.value?.length && (
                                <>
                                    {dataSearch?.webPages.value.map((value: ValueElement, index: number) => (
                                        <Box key={index} mb={"2rem"}>
                                            <Link href={value.url}>
                                                <Heading as="h4" size="md" color={"blue.400"}>
                                                    {value.name}
                                                </Heading>
                                            </Link>

                                            <Link href={value.url}>
                                                <Text fontSize="xl" color={"green.400"}>
                                                    {value.displayUrl}
                                                </Text>
                                            </Link>
                                            <Text fontSize="md">{value.snippet}</Text>
                                        </Box>
                                    ))}
                                    <Flex alignItems={"center"} marginBottom={"2rem"}>
                                        <ChevronLeftIcon color="gray.600" boxSize={6} cursor={"pointer"}
                                            onClick={(e) => handleChangePagination(e, pagination.current > 1 ? pagination.current - 1 : pagination.current, total, pagination)} />
                                        <Flex justifyContent={"space-evenly"}
                                            width={{
                                                base: '80%',
                                                md: '50%',
                                                xl: '30%',
                                            }}
                                        >
                                            {!!pagination?.paginations?.length && pagination.paginations.map((value: number, index: number) => (
                                                <Box key={index} width={"2rem"} textAlign={"center"}
                                                    _hover={{
                                                        background: "blue.200",
                                                    }}
                                                    rounded={"6"} cursor={"pointer"}
                                                    backgroundColor={pagination.current == value ? "blue.200" : "inherit"}
                                                    onClick={(e) => handleChangePagination(e, value, total, pagination)}>
                                                    <Text fontSize="md">{value}</Text>
                                                </Box>
                                            ))}
                                        </Flex>
                                        <ChevronRightIcon color="gray.600" boxSize={6} cursor={"pointer"}
                                            onClick={(e) => handleChangePagination(e, pagination.current < total ? pagination.current + 1 : pagination.current, total, pagination)} />
                                    </Flex>
                                </>
                            )}
                        </Flex>
                    </Flex>
                </Box >
            ) : (null)}

        </>
    );
};
