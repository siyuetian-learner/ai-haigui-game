export default function LoadingMask({ text }: { text?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/80 backdrop-blur">
      {text ?? 'AI 思考中...'}
    </div>
  )
}

