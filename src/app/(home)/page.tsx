import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { Navbar } from './navbar'
import { TemplateGallery } from './template-gallery'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 bg-white p-4'><Navbar /></div>
      <div className='mt-20'>
          <TemplateGallery />
      </div>
    </div>
  )
}

export default Home
 