import { createBrowserRouter } from "react-router-dom";
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Discover />,
  },
  {
    path: '/top-artists',
    element: <TopArtists />,
  },
  {
    path: '/around-you',
    element: <AroundYou />,
  },
  {
    path: '/artists/:id',
    element: <ArtistDetails />,
  },
  {
    path: '/songs/:songid',
    element: <SongDetails />,
  },
  {
    path: '/search/:searchTerm',
    element: <Search />,
  },
])

export default router;