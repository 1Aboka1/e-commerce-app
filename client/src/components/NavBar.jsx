import LogoDevIcon from '@mui/icons-material/LogoDev'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const NavBar = () => {
  return (
    <div className="navbar">
        <div className='flex items-center fixed w-screen h-14 bg-slate-800 justify-between'>
          <LogoDevIcon className='h-12 w-12 ml-5 text-blue-400'/>
          <div className='mr-7 space-x-3 flex items-center'>
          {/* <form>   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>
                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form> */}
            <span className="text-gray-100 text-xs">Home</span>
            <span className="text-gray-100 text-xs">Catalog</span>
            <div className="p-2 border rounded-md border-cyan-300">
              <span className="text-gray-100 bg-slate-600 p-2 rounded-md text-xs">Login</span>
              <span className="text-gray-100 p-2 rounded-md text-xs">Register</span>
            </div>
          </div>
          <form className='bg-slate-600 rounded-md'>
            <SearchOutlinedIcon font-size='87'/>
          </form>
        </div>
    </div>
  )
}
