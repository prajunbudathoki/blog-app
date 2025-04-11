import BlogCard from './BlogCard'

export default function BlogPosts() {
    // const url = 'https://jsonplaceholder.typicode.com/posts'
    // fetch(url).then((res) => res.json())
    // .then((result) => console.log(result))
    return(
        <>  
            <div className='p-4'>
                <h1 className='text-2xl font-bold'>Featured Blog Posts</h1>
                <BlogCard />
            </div>
        </>
    )
}