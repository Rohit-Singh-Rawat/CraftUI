import HexagonBackground from '@/components/crafts/HexagonBackground'

const page = () => {
  return (
    <div>
      <HexagonBackground
        className="min-h-screen"
        color="#FFFF00"
        secondaryColor="#CC5500"
        fade
        cellSize={'200px'}
        opacity={0.8}
      />
    </div>
  )
}
export default page
