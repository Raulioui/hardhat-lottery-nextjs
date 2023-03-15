export default function Loader(){
    return(
        <div className='absolute right-0 left-0 text-center mx-auto h-screen top-[300px]'>
            <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}