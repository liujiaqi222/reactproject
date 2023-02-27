import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer'
import Link from 'next/link'
import GoogleLogin from "react-google-login";
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im'
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const userProfile = false; //用户没有登陆
  const normalLink = 'flex items-center justify-center gap-3 hover:bg-primary p-3  xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded'
  return (
    <div className=' overflow-x-hidden'>
      <div className='block xl:hidden m-2 ml-4 mt-3 text-xl' onClick={() => setShowSidebar((prev) => !prev)}>
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 xl:border-0 p-3 w-20 flex flex-col justify-start mb-0 border-r-2 border-gray-100'>
          <div className='xl:border-b-2 xl:pb-4 border-gray-200'>
            <Link href='/'>
              <div className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='text-xl hidden xl:block'>For you</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-400'>Log in to like and comment on videos</p>
              <div className='pr-4'>
                <GoogleLogin clientId='' render={(renderProps) =>
                  (<button className='bg-white text-lg text-[#f51997] border-[1px] border-[#f51997] font-semibold px-6 py-3 cursor-pointer outline-none rounded-md w-full mt-3 hover:text-white hover:bg-[#f51997]' onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>)}

                  onSuccess={() => { }} onFailure={() => { }} cookiePolicy='single_host_origin' />
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccounts/>
          <Footer/>
        </div>

      )
      }
    </div >
  )
}

export default Sidebar