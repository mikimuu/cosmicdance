import fs from 'fs';
import matter from 'gray-matter';

export async function getStaticPaths() {
    const files = fs.readdirSync('posts');
    const paths = files.map((filename) => ({
      params: {
        slug: filename.replace(/\.md$/, ''),
      },
    }));
    console.log('paths:', paths);
    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

const Post = ({ frontMatter, content }) => {
    return (
      <div>
        <h1>{frontMatter.title}</h1>
        <div>{content}</div>
      </div>
    );
  };
  
  export default Post;
  