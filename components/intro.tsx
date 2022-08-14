import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex items-baseline">
      <h1 className="text-5xl md:text-8xl font-bold inline-flex tracking-tighter leading-tight md:pr-4">
        ærea
      </h1>
      <h1 className="text-5xl float-right md:text-6xl inline-flex tracking-tighter leading-tight md:pr-8">
        lab
      </h1>
      </div>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Thoughts, research and photography {' '}
        {/* <a
          href="https://nextjs.org/"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          NFTs
        </a>{' '}
        and {CMS_NAME}. */}
      </h4>
    </section>
  )
}

export default Intro
