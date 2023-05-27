import { Header } from '@/components'
import './globals.css'
import { Sora } from 'next/font/google'

const sora = Sora({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
    subsets: ['latin']
})

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}


export default function RootLayout({
    children,
}: {
    children: any
}) {
    // console.log(children.props.childProp.segment)
    return (
        <html lang="en">
            <body className={sora.className}>
                {
                    !['studio'].includes(children.props.childProp.segment) &&
                    < Header />
                }
                {children}
            </body>
        </html>
    )
}
