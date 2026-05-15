import { PortableText as SanityPortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Content image'}
            fill
            className="object-cover"
          />
          {value.caption && (
            <p className="mt-2 text-center text-sm text-gray-500 italic">{value.caption}</p>
          )}
        </div>
      )
    },
    callout: ({ value }: any) => {
      const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        success: 'bg-green-50 border-green-200 text-green-800',
      }
      const style = styles[value.type as keyof typeof styles] || styles.info
      return (
        <div className={`p-4 my-6 border-l-4 rounded-r-md ${style}`}>
          {value.text}
        </div>
      )
    },
    videoEmbed: ({ value }: any) => {
      return (
        <div className="my-8 aspect-video w-full rounded-lg overflow-hidden">
           <iframe
            src={value.url}
            className="w-full h-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {value.caption && (
            <p className="mt-2 text-center text-sm text-gray-500 italic">{value.caption}</p>
          )}
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = value.blank ? '_blank' : undefined
      return (
        <a href={value.href} rel={rel} target={target} className="text-purple-600 underline hover:text-purple-800 transition">
          {children}
        </a>
      )
    },
    scripture: ({ children, value }: any) => {
      return (
        <span className="bg-orange-50 text-orange-700 px-1 rounded font-medium border border-orange-100">
          {children} <span className="text-xs uppercase ml-1 opacity-70">({value.version})</span>
        </span>
      )
    },
  },
}

export function PortableText({ value }: { value: any }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-purple-600">
      <SanityPortableText value={value} components={components} />
    </div>
  )
}
