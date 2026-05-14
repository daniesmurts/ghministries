export const metadata = {
  title: 'Sanity Studio | Great Harvest Ministries',
  description: 'Content management for Great Harvest Ministries',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
