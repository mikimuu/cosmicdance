import fs from 'fs'

export async function getStaticProps() {
    return {props:{post:''} }
}

export async function getStaticPaths() {
    const files = fs.readdirSync('posts')
    const paths = files.map(filename => ({
        params: {
            slug: filename.replace(/\.md$/, '')
        }
    }))
    return {
        paths,
        fallback: false
    }
}
const Post = () => {
    return <div>here contents</div>
}
