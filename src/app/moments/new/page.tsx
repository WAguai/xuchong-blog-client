import { Card } from "@/components/ui/card"
import { MomentsForm } from "@/components/moments/moments-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewMomentPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="flex flex-col items-start gap-4 md:gap-8">
        <Link href="/moments" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回说说
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">发布新说说</h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">分享你此刻的想法和心情。</p>
        </div>

        <Card className="w-full p-6">
          <MomentsForm />
        </Card>
      </div>
    </div>
  )
}
