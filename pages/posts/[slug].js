import fs from 'fs'
import matter from 'gray-matter'
import {marked} from 'marked'

export async function getStaticProps({ params }) {
    const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
    console.log(file);
    return { props: { post: '' } };
  }

export async function getStaticPaths({params }){
    const files = fs.readFileSync('posts/${params.slug}.md', 'utf-8')
    const {data,content} = matter(file)
    return{props:{frontMatter:data,content}}    
}


const Post = ({frontMatter,content}) => {
    return (
        <div>
           <h1>{frontMatter.title}</h1>
            <div dangerouslySetInnerHTML=
            {{__html:marked(content)}}></div>        
        </div>
    )
}

export default Post