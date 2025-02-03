"use client"

import React, { useState, useEffect } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { ChevronRight } from 'lucide-react'
import Filter from './components/Filter'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductList from './components/Cards/Cards';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Filters {
    category: string;
    priceRange: number[];
    colors: string[];
    size: string[];
    dressStyle: string;
}

function Page() {
    const [filters, setFilters] = useState<Filters>({
        category: '',
        priceRange: [0, 500],
        colors: [],
        size: [],
        dressStyle: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const productsPerPage = 10;

    const handleFilterChange = (newFilters: Partial<Filters>) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
        setCurrentPage(1); 
    };

    useEffect(() => {
        const fetchTotalProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setTotalProducts(data.length || 0);
            } catch (error) {
                console.error('Error fetching total products:', error);
            }
        };

        fetchTotalProducts();
    }, []);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    return (
        <div className='w-full mt-6 flex flex-col justify-center items-center'>
            <Breadcrumb className='mx-[16px] md:mx-[100px] w-[81.25vw]'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <ChevronRight />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {filters.category || filters.dressStyle ? `${filters.category || filters.dressStyle}` : 'All Products'}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='flex gap-[20px] mt-6 justify-center'>
                {/* filter section */}
                <Filter
                    onFilterChange={handleFilterChange}
                />

                {/* heading */}
                <div className='flex flex-col justify-start items-center w-full md:max-w-[950px] px-[16px] md:max-px-[100px]'>
                    <div className="flex flex-row gap-[8px] lg:justify-between w-full">
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold text-2xl md:text-[28px] tracking-tighter text-nowrap">
                                {filters.category || filters.dressStyle ? `${filters.category || filters.dressStyle}` : 'All Products'}
                            </h1>
                        </div>
                        <div className="w-full flex justify-between md:justify-end items-center flex-row">
                            <span className="text-sm md:text-base text-black/60 md:mr-3 tracking-tighter">
                                Showing {(currentPage - 1) * productsPerPage + 1}-{Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} Products
                            </span>
                            <div className=" hidden md:flex flex-col lg:flex-row items-center tracking-tighter">
                                Sort by:{" "}
                                <Select defaultValue="most-popular">
                                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none focus:ring-transparent">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="most-popular">Most Popular</SelectItem>
                                        <SelectItem value="low-price">Low Price</SelectItem>
                                        <SelectItem value="high-price">High Price</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button className='flex md:hidden bg-[#F0F0F0] w-[32px] h-[32px] rounded-full'>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.75 7.75V13.5C8.75 13.6989 8.67098 13.8897 8.53033 14.0303C8.38968 14.171 8.19891 14.25 8 14.25C7.80109 14.25 7.61032 14.171 7.46967 14.0303C7.32902 13.8897 7.25 13.6989 7.25 13.5V7.75C7.25 7.55109 7.32902 7.36032 7.46967 7.21967C7.61032 7.07902 7.80109 7 8 7C8.19891 7 8.38968 7.07902 8.53033 7.21967C8.67098 7.36032 8.75 7.55109 8.75 7.75ZM12.5 12C12.3011 12 12.1103 12.079 11.9697 12.2197C11.829 12.3603 11.75 12.5511 11.75 12.75V13.5C11.75 13.6989 11.829 13.8897 11.9697 14.0303C12.1103 14.171 12.3011 14.25 12.5 14.25C12.6989 14.25 12.8897 14.171 13.0303 14.0303C13.171 13.8897 13.25 13.6989 13.25 13.5V12.75C13.25 12.5511 13.171 12.3603 13.0303 12.2197C12.8897 12.079 12.6989 12 12.5 12ZM14 9.5H13.25V2.5C13.25 2.30109 13.171 2.11032 13.0303 1.96967C12.8897 1.82902 12.6989 1.75 12.5 1.75C12.3011 1.75 12.1103 1.82902 11.9697 1.96967C11.829 2.11032 11.75 2.30109 11.75 2.5V9.5H11C10.8011 9.5 10.6103 9.57902 10.4697 9.71967C10.329 9.86032 10.25 10.0511 10.25 10.25C10.25 10.4489 10.329 10.6397 10.4697 10.7803C10.6103 10.921 10.8011 11 11 11H14C14.1989 11 14.3897 10.921 14.5303 10.7803C14.671 10.6397 14.75 10.4489 14.75 10.25C14.75 10.0511 14.671 9.86032 14.5303 9.71967C14.3897 9.57902 14.1989 9.5 14 9.5ZM3.5 10C3.30109 10 3.11032 10.079 2.96967 10.2197C2.82902 10.3603 2.75 10.5511 2.75 10.75V13.5C2.75 13.6989 2.82902 13.8897 2.96967 14.0303C3.11032 14.171 3.30109 14.25 3.5 14.25C3.69891 14.25 3.88968 14.171 4.03033 14.0303C4.17098 13.8897 4.25 13.6989 4.25 13.5V10.75C4.25 10.5511 4.17098 10.3603 4.03033 10.2197C3.88968 10.079 3.69891 10 3.5 10ZM5 7.5H4.25V2.5C4.25 2.30109 4.17098 2.11032 4.03033 1.96967C3.88968 1.82902 3.69891 1.75 3.5 1.75C3.30109 1.75 3.11032 1.82902 2.96967 1.96967C2.82902 2.11032 2.75 2.30109 2.75 2.5V7.5H2C1.80109 7.5 1.61032 7.57902 1.46967 7.71967C1.32902 7.86032 1.25 8.05109 1.25 8.25C1.25 8.44891 1.32902 8.63968 1.46967 8.78033C1.61032 8.92098 1.80109 9 2 9H5C5.19891 9 5.38968 8.92098 5.53033 8.78033C5.67098 8.63968 5.75 8.44891 5.75 8.25C5.75 8.05109 5.67098 7.86032 5.53033 7.71967C5.38968 7.57902 5.19891 7.5 5 7.5ZM9.5 4.5H8.75V2.5C8.75 2.30109 8.67098 2.11032 8.53033 1.96967C8.38968 1.82902 8.19891 1.75 8 1.75C7.80109 1.75 7.61032 1.82902 7.46967 1.96967C7.32902 2.11032 7.25 2.30109 7.25 2.5V4.5H6.5C6.30109 4.5 6.11032 4.57902 5.96967 4.71967C5.82902 4.86032 5.75 5.05109 5.75 5.25C5.75 5.44891 5.82902 5.63968 5.96967 5.78033C6.11032 5.92098 6.30109 6 6.5 6H9.5C9.69891 6 9.88968 5.92098 10.0303 5.78033C10.171 5.63968 10.25 5.44891 10.25 5.25C10.25 5.05109 10.171 4.86032 10.0303 4.71967C9.88968 4.57902 9.69891 4.5 9.5 4.5Z" fill="black" />
                                        </svg>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="bottom" className="h-screen w-full overflow-y-auto flex justify-center">
                                    <Filter onFilterChange={handleFilterChange} isMobile={true} />
                                </SheetContent>
                            </Sheet>
                        </div>

                    </div>
                    <ProductList filters={filters} currentPage={currentPage} productsPerPage={productsPerPage} />
                    <hr className='w-full mt-[32px] mb-[20px] border-gray-200' />
                    <Pagination className="justify-between">
                        <PaginationPrevious href="#" className="w-[85px] md:w-auto border border-black/10" />
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationLink href="#" className="text-black/50 font-medium text-sm" isActive>
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="hidden lg:block">
                                <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                                    3
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                            </PaginationItem>
                            <PaginationItem className="hidden lg:block">
                                <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                                    8
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem className="hidden sm:block">
                                <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                                    9
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" className="text-black/50 font-medium text-sm">
                                    10
                                </PaginationLink>
                            </PaginationItem>
                        </PaginationContent>

                        <PaginationNext href="#" className="w-[60px] md:w-auto border border-black/10" />
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

export default Page