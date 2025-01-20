import { Button } from "../ui/button"

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h2 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#f56551]">Discover your next adventure with AI:</span>
        Personalized Iteneries at your fingertips
      </h2>

      <p className="text-xl text-gray-500 text-center">
        Your personal trip planner and travel curator,
        creating custom iteneries taliored to your interestand budget
      </p>
      <Button>Get Started, It&apos;s Free</Button>
    </div>
  )
}

export default Hero