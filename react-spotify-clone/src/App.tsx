import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';


const App = () => {
  const [list, setList] = useState(1)
  return (
    <div>
      <button onClick={() => setList(1)} >posts list 1</button>
      <button onClick={() => setList(2)}>posts list 2</button>
      <br />
      {list === 1 ? <PostList1 /> : <PostList2 />}
    </div>
  )
};


const getPost = async (type: string) => {
  return axios.get('http://localhost:3000/posts', {
    params: {
      type
    }
  })
}

const PostList1 = () => {
  const { data, isLoading, error, status, fetchStatus } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPost('1')
  })
  console.log('status:', status, '   fetchStatus:', fetchStatus, '来自postlist1')
  return (
    <>
      <h1>Post List 1</h1>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error)}</pre>}
      <ol>
        {data && data.data.map((post: any) => {
          return <li key={post.id}>{post.title} </li>
        })}
      </ol>
    </>
  )
}
const PostList2 = () => {
  const { data, isLoading, error, status, fetchStatus } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPost('2')
  })
  console.log('status:', status, '   fetchStatus:', fetchStatus, '来自postlist2')

  return (
    <>
      <h1>Post List 1</h1>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error)}</pre>}
      <ol>
        {data && data.data.map((post: any) => {
          return <li key={post.id}>{post.title} </li>
        })}
      </ol>
    </>
  )
}

export default App;
