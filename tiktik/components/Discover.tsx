import Link from 'next/link';
import { useRouter } from 'next/router';
import {topics} from '../utils/constants'


function Discover() {
  const router = useRouter();
  const {topic} = router.query;
  const activeTopicStyle = 'xl:border-2 flex gap-1 justify-center items-center hover:bg-primary xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full cursor-pointer text-[#f51997]';
  const topicStyle='xl:border-2 flex gap-2 justify-center items-center hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full cursor-pointer text-black'
  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='flex gap-2 flex-wrap '>
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle:topicStyle}>
              <span className='font-bold text-2xl'>{item.icon}</span>
              <span className='font-medium text-base  hidden xl:block capitalize round'>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover