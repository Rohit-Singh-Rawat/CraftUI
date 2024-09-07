import { WordShift } from '@/components/crafts/Word-shift'

const page = () => {
  const word = 'rohit'
  return (
    <div>
      <span>
        {word.split('').map((letter, letterIndex) => (
          <span
            className="group inline-block text-xl leading-none"
            key={letter + letterIndex}
          >
            <span
              className="block overflow-hidden transition-all duration-500 group-hover:-translate-x-1/2 group-hover:-translate-y-1/4 group-hover:-rotate-45 group-hover:opacity-0 group-hover:blur"
              style={{
                clipPath: 'polygon(-50% -50%, 150% -50%, 150% 50%, -50% 50%)',
              }}
            >
              {letter}
            </span>
            <span
              className="block -translate-y-full overflow-hidden transition-all duration-500 group-hover:-translate-x-1/2 group-hover:-translate-y-1/4 group-hover:rotate-45 group-hover:opacity-0 group-hover:blur"
              style={{
                clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
              }}
            >
              {letter}
            </span>
          </span>
        ))}
      </span>

      <WordShift words={['worl', 'world']} className="text-9xl" />
    </div>
  )
}
export default page
