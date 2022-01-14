import { ref } from "vue"

const defaultNote = `# パワーホール（長州力の入場曲）
4EAwzCoAViI

# 軽快なJazz
MNENa7PTmQY

# bokunohune - Cry Me to the Moon
RBjJc8o--tE

# bokunohune - nanamagari
4hChGrmajMI

# X JAPAN - 紅 (Tokyo Dome 2009.05.03)
xR4qXUwsp9Q

# lofi hip hop radio - beats to relax/study to
5qap5aO4i9A

# No Copyrights 日本の80年代シティポップ 80'S Japanese Mix#1
E0IImqWeQpo
` as const

const StorageKey = {
  note: 'note'
} as const
type StorageKey = typeof StorageKey[keyof typeof StorageKey]

export default function useNote() {
    
  const note = ref('')
  
  const initNote = () => {
    const localStorageNote = localStorage.getItem(StorageKey.note)
    note.value = localStorageNote ?? defaultNote
  }

  const resetNote = () => {
    note.value = defaultNote
  }

  const updateNote = (value: string) => {
    note.value = value
  }

  const updateStorageNote = () => {
    localStorage.setItem(StorageKey.note, note.value)
  }

  return {
    note,
    initNote,
    resetNote,
    updateNote,
    updateStorageNote,
  }
}
