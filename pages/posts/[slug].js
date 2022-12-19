import fs from 'fs';
import matter from 'gray-matter';
import {marked} from 'marked';
import markdownit from 'markdown-it';
import Image from 'next/image';



export async function getStaticProps({ params }) {
    const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
    const { data, content } = matter(file);
    return { props: { frontMatter: data, content } };
  }
export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  console.log('paths:', paths);
  return {
    paths,
    fallback: false,
  };
}

const Post = ({ frontMatter, content }) => {
    return (
      <div className='prose prose-lg max-w-none'>
        <Image
            src={'/${frontMatter.image}'}
            alt={frontMatter.title}
            width={1000}
            height={500}
            />
        <h1 className='mt-12'>{frontMatter.title}</h1>
        <span>{frontMatter.date}</span>
        <div dengerouslySetInnerHTML={{__html:marked(content)}}></div>
      </div>
    );
  };
  

export default Post;