import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import SectionHeader from '../shared/SectionHeader'
import { HorizontalCard } from './HorizontalCard'
export default function Blogs() {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        fetch('blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, [])
    return (
        <Container>
            <SectionHeader title="Health Blog" description="" />
            <div className='flex justify-center'>
                <div className='mx-auto space-y-6'>
                    {
                        blogs.map(blog => <HorizontalCard data={blog} key={blog.banner} />)
                    }

                </div>
            </div>
        </Container>
    )
}