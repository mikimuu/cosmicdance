import fs from 'fs';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import Image from 'next/image';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import toc from 'mdast-util-toc'

const getToc = (options)=> {
  return (node) => {
    const result = toc(node, options)
    node.children = [result.map]
  }
}

const toc = await unified()
  .use(remarkParse)
  .use(getToc,{
    tight: true,
    heading: '目录',
  })
  .process(content)
  .use(remarkRehype)
  .use(rehypeStringify)

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkToc)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  return { props: { 
    frontMatter: data,
    content: result.toString(),
    toc: toc.toString(),
    slug:params.slug,
   }
   };
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

const Post = ({ frontMatter, content }) => {
  return (
    <div className='prose prose-lg max-w-none'>
      <div className='border'>
      <Image
        src={'/${frontMatter.image}'}
        alt={frontMatter.title}
        width={1920}
        height={1080}
        />
      <h1 className='mt-12'>{frontMatter.title}</h1>
      <span>{frontMatter.date}</span>
      <div className='space-x-2'>
        {frontMatter.categories.map((category) => (
          <span key={category}>
            <Link href={`/categories/${category}`}>
              <a className='text-blue-500'>{category}</a>
            </Link>
          </span>
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-9'>{toReactNode(content)}</div>
        <div className='col-span-3'>{toReactNode(toc)}</div>
          <div
            className='sticky top-[50]px'
            dangerouslySetInnerHTML={{ __html: toc }}
            > 
          </div>

          </div>
      </div>
    </div>
    
  );
};

export default Post;