import service from './index'

export const getNewSong = ()=>{
  return service.get('/personalized/newsong')
}