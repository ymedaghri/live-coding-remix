export default function SimpleFrame({ children }: any) {
  return (
    <div className="p-4">
      <div className="flex h-screen w-full flex-col items-center justify-center overflow-y-auto rounded-lg border bg-gray-50">
        {children}
      </div>
    </div>
  )
}
