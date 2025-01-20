import { Button } from "../ui/button"

const Header = () => {
    return (
        <div className="p-2 shadow-sm flex justify-between">
            <img src="/logo.svg" />
            <div>
                <Button>Sign In</Button>
            </div>
        </div>

    )
}

export default Header