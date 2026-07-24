import { useState } from 'react'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'
import NoteView from './components/NoteView'
import Review from './components/Review'
import Quiz from './components/Quiz'
import Collection from './components/Collection'
import DailyHub from './components/DailyHub'
import { useStore, type Note, type NewNoteInput } from './lib/store'
import { dueNotes } from './lib/selectors'

type Tab = 'notes' | 'review' | 'quiz' | 'english' | 'collection'
type Screen =
  | { kind: 'tab' }
  | { kind: 'new'; initial?: Partial<NewNoteInput> }
  | { kind: 'view'; id: string }
  | { kind: 'edit'; id: string }

export default function App() {
  const [tab, setTab] = useState<Tab>('notes')
  const [screen, setScreen] = useState<Screen>({ kind: 'tab' })
  const notes = useStore((s) => s.notes)
  const due = dueNotes(notes).length

  const noteById = (id: string): Note | undefined => notes.find((n) => n.id === id)

  const openNote = (n: Note) => setScreen({ kind: 'view', id: n.id })
  const goTab = (t: Tab) => {
    setTab(t)
    setScreen({ kind: 'tab' })
  }

  // 전체화면(에디터/뷰어)일 때는 탭바를 숨긴다
  const fullscreen = screen.kind !== 'tab'
  const current = screen.kind === 'view' || screen.kind === 'edit' ? noteById(screen.id) : undefined

  return (
    <div className="app">
      <div className="screen">
        {screen.kind === 'tab' && tab === 'notes' && (
          <NoteList onOpen={openNote} onNew={() => setScreen({ kind: 'new' })} />
        )}
        {screen.kind === 'tab' && tab === 'review' && <Review onOpen={openNote} />}
        {screen.kind === 'tab' && tab === 'quiz' && <Quiz />}
        {screen.kind === 'tab' && tab === 'english' && (
          <DailyHub onSaveToNote={(initial) => setScreen({ kind: 'new', initial })} />
        )}
        {screen.kind === 'tab' && tab === 'collection' && <Collection />}

        {screen.kind === 'new' && (
          <NoteEditor initial={screen.initial} onDone={(id) => setScreen(id ? { kind: 'view', id } : { kind: 'tab' })} />
        )}
        {screen.kind === 'edit' && current && (
          <NoteEditor edit={current} onDone={(id) => setScreen(id ? { kind: 'view', id } : { kind: 'tab' })} />
        )}
        {screen.kind === 'view' &&
          (current ? (
            <NoteView
              note={current}
              onEdit={() => setScreen({ kind: 'edit', id: current.id })}
              onBack={() => setScreen({ kind: 'tab' })}
            />
          ) : (
            // 삭제된 노트 등
            <div className="empty">
              <p>노트를 찾을 수 없어요.</p>
              <button className="new-btn" onClick={() => setScreen({ kind: 'tab' })}>
                목록으로
              </button>
            </div>
          ))}
      </div>

      {!fullscreen && (
        <nav className="tabbar no-print">
          <button className={tab === 'notes' ? 'on' : ''} onClick={() => goTab('notes')}>
            <span className="ico">📒</span>노트
          </button>
          <button className={tab === 'review' ? 'on' : ''} onClick={() => goTab('review')}>
            <span className="ico">🌱</span>복습
            {due > 0 && <span className="due-dot">{due}</span>}
          </button>
          <button className={tab === 'quiz' ? 'on' : ''} onClick={() => goTab('quiz')}>
            <span className="ico">🧠</span>퀴즈
          </button>
          <button className={tab === 'english' ? 'on' : ''} onClick={() => goTab('english')}>
            <span className="ico">📣</span>학습
          </button>
          <button className={tab === 'collection' ? 'on' : ''} onClick={() => goTab('collection')}>
            <span className="ico">🏆</span>성취
          </button>
        </nav>
      )}
    </div>
  )
}
