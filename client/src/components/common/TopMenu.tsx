import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Separator } from '../ui/separator'
import { ThemeToggle } from '../ui/ThemeToggle'
import {SidebarTrigger } from '../ui/sidebar'
const TopMenu = () => {
  return (
      <>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-[#20787A] text-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
            <ThemeToggle/>
          </Breadcrumb>
        </header>
      </>
  )
}

export default TopMenu
