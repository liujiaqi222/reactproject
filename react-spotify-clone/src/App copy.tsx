import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import router from './router';
import { RouterProvider, } from "react-router-dom";
const App = () => {


  return (
    <div className="relative flex h-full ">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <RouterProvider router={router} />
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;
