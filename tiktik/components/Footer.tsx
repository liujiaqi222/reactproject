import { footerList1, footerList2, footerList3 } from '../utils/constants'

const List = ({items}:{items:string[]}) => (
  <div className='flex flex-wrap gap-2 '>
    {items.map((item) => (
      <p key={item} className='text-gray-400 text-sm hover:underline'>{item}</p>
    ))}
  </div>
)

function Footer() {
  return (
    <div className='mt-6 hidden xl:flex flex-col gap-5'>
      <List items={footerList1}/>
      <List items={footerList2}/>
      <List items={footerList3}/>
      <p className='text-gray-400 text-sm'>2022 TikTik</p>
    </div>
  )
}

export default Footer