import Head from 'next/head'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { getAllIdeas } from '@/helper/getAllIdeas'
import { limitCharacters } from '@/helper/limitCharacters'

function Article({ article }) {
  return (
    <article className="mt-5 sm:mt-0 md:grid md:grid-flow-col md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <div className="flex items-center justify-between gap-5">
          <Card.Title href={`/ideas/2024/${article.slug}`}>
            {article.title}
          </Card.Title>
          <Card.Tags>
            {article.projectDuration ? article.projectDuration : 'TBD'}
          </Card.Tags>
          <Card.Tags>
            {article.difficulty ? article.difficulty : 'TBD'}
          </Card.Tags>
        </div>
        <Card.Description>
          {limitCharacters(article.description, 350)}
        </Card.Description>
        <p className="text-md font-mono font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          Expected outcomes
        </p>
        <Card.Info>
          {article.outcomes ? limitCharacters(article.outcomes, 100) : 'TBD'}
        </Card.Info>
        <p className="text-md font-mono font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          Skills
        </p>
        <Card.Info>
          {article.skills ? limitCharacters(article.skills, 100) : 'TBD'}
        </Card.Info>
        <p className="text-md font-mono font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          Mentors
        </p>
        <Card.Info>
          {article.mentors ? limitCharacters(article.mentors, 50) : 'TBD'}
        </Card.Info>
        <Card.Cta>Know More</Card.Cta>
      </Card>
    </article>
  )
}

export default function Ideas({ articles }) {
  return (
    <>
      <Head>
        <title>Idea List</title>
        <meta name="description" content="Idea List for GSOC" />
      </Head>
      <Container className="mt-20 mb-28">
        <div className="">
          <p className="font-mono text-lg leading-7 text-zinc-600 dark:text-zinc-400">
            Explore the world of open-source possibilities with AOSSIE&apos;s{' '}
            <b>Idea List</b>. As part of Google Summer of Code, we offer
            a unique opportunity for developers to explore new ideas,  a wide
            variety of projects for developers to choose from and contribute to.
            From developing new features to fixing critical bugs, our idea list
            is your go-to destination for finding your next big project and
            kickstart your open-source journey.
          </p>
        </div>
        <Container.Inner>
          <div className="mt-10 flex justify-center sm:mt-20">
            <div className="grid gap-6 gap-y-8 md:grid-cols-2 md:grid-rows-4">
              {articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link
              className="group order-2 mx-auto items-center overflow-hidden rounded-lg bg-zinc-800 px-8 py-3 text-white focus:outline-none dark:bg-white dark:text-black"
              href="/ideas/2023"
            >
              <span className="text-center font-mono font-semibold">
                View 2023 Idea List
              </span>
            </Link>
          </div>
        </Container.Inner>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllIdeas()).map(({ component, ...meta }) => meta),
    },
  }
}
