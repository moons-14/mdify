import { AtSign } from "lucide-react"
import { Button } from "../ui/button"

export const AppHeader = () => {
    return (<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-6">
        <nav className="gap-6 text-lg font-medium flex flex-row items-center justify-between w-full">
            <div
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
                <img className="h-6 w-6" src="/images/icon128.png" alt="MDify" />
                <span className="sr-only">MDify</span>
            </div>
            <div className="flex items-center justify-center gap-4">
                <a className="text-muted-foreground transition-colors text-sm hover:text-foreground" href="https://github.com/inaridiy/webforai#readme" target="_blank">
                    special thanks: <span className="font-semibold">webforai</span>
                </a>
                <a
                    href="https://x.com/moons_dev"
                    target="_blank"
                >
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto gap-1.5 text-sm"
                    >
                        <AtSign className="size-3.5" />
                        Contact Us
                    </Button>
                </a>
            </div>
        </nav>
    </header>
    )
}