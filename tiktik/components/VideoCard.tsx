import { Video } from '../types'
import { NextPage } from 'next'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'


interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null);
  const onVideoPress = () => {
    console.log(videoRef.current?.width);
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false)
    } else {
      videoRef?.current?.play();
      setPlaying(true)
    }
  }
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href='/'>
              <>
                <Image width={62} height={62} className='rounded-full' src={post.postedBy.image} alt='profile photo' layout='responsive' />
              </>
            </Link>
          </div>
          <div>
            <Link href='/'>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center font-bold text-primary '>{post.postedBy.userName}
                  <GoVerified className='text-blue-400 text-base' />
                </p>
                <p className='font-medium text-gray-500 text-xs hidden capitalize md:block '>{post.postedBy.userName}</p>

              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:ml-20 ml-2 flex gap-4 '>
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="rounded-3xl relative">
          <Link href='/'>
            <video ref={videoRef} src={post.video.asset.url} loop className='lg:max-w-[600px]  max-w-[230px] rounded-2xl cursor-pointer'>
            </video>
          </Link>
          {isHover && (
            <div className='absolute bottom-0 cursor-pointer rounded-b-2xl flex items-center p-2 gpa-2 bg-[rgba(0,0,0,0.3)] w-full' >
              {playing ? (<button onClick={onVideoPress} className='text-white text-2xl lg:text-4xl'><BsFillPauseFill /></button>) : (<button onClick={onVideoPress} className='text-white text-2xl lg:text-4xl'><BsFillPlayFill /></button>)}
              {isVideoMuted ? (<button onClick={() => { setIsVideoMuted(false) }} className='text-white text-1.5xl lg:text-3xl'><HiVolumeOff /></button>) : (<button onClick={() => setIsVideoMuted(true)} className='text-white text-3xl lg:text-2xl'><HiVolumeUp /></button>)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard