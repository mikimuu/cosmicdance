import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import {Headline} from '../components/Headline'
import Header from '../components/header'
import {Main} from '../components/main'
import rehypeSlug from 'rehype-slug'


//export header component

  

//load markdown file in posts folder using fs module and readdirSync
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import PostCard from '../components/postcard'





export const getStaticProps = () => {
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );

  return {
    props: {
      posts: sortedPosts,
    },
  };
};


    

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
    <Head>
      <title>宇宙的舞踏</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <div className="my-8">
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  </div>
  );
}

