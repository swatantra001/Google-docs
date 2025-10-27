"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { Navbar } from './navbar'
import { TemplateGallery } from './template-gallery'
import { Authenticated, AuthLoading, Unauthenticated, usePaginatedQuery, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { DocumentsTable } from './documents-table'
import { useSearchParam } from '@/hooks/use-search-param'
import { FullscreenLoader } from '@/components/fullscreen-loader'
import { Children } from 'react'
import { SignIn } from '@clerk/nextjs'

const Home = () => {
  //const documents = useQuery(api.documents.get).collect();

  const [search] = useSearchParam("search");

  const {results, status, loadMore} = usePaginatedQuery(api.documents.get, {search}, {initialNumItems: 5});

  // return (
  //   <>
  //   <Authenticated>
  //   <div className='min-h-screen flex flex-col'>
  //     <div className='fixed top-0 left-0 right-0 z-10 bg-white p-4'><Navbar /></div>
  //     <div className='mt-20'>
  //         <TemplateGallery />
  //         <DocumentsTable
  //             documents={results}
  //             loadMore={loadMore}
  //             status={status}
  //         />
  //     </div>
  //   </div>
  //   </Authenticated>

  //   <AuthLoading>
  //       <FullscreenLoader />
  //     </AuthLoading>
      


  //     <Unauthenticated>
  //       <div className="flex flex-col items-center justify-center min-h-screen">
  //         <SignIn routing="hash" />
  //       </div>
  //     </Unauthenticated>
  //   </>
  // )

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 bg-white p-4'><Navbar /></div>
      <div className='mt-20'>
          <TemplateGallery />
          <DocumentsTable
              documents={results}
              loadMore={loadMore}
              status={status}
          />
      </div>
    </div>
  )
}

export default Home
 