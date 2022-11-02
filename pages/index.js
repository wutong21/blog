import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from 'graphql-request';
import BlogCard from "../components/BlogCard";

const hygraph = new GraphQLClient(
  'https://api-eu-west-2.hygraph.com/v2/cl9l1m65v3hji01t82v2jhmjz/master',
);


const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        publishedAt
        createdBy {
          id
        }
        url
      }
    }
  }
`

export async function getStaticProps() {
  const { posts } = await hygraph.request(QUERY)

  return {
    props: {
      posts
    },
    revalidate: 10
  }
}



export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>W.T Blog</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}