import { useEffect, useRef, useState } from 'react'
import { useStore } from '../lib/store'
import { todayId } from '../lib/date'

/**
 * 공부(복습) 타이머. 시작하면 초를 세고, 멈추면 오늘 공부 시간에 더한다.
 * 페이지를 떠나거나 언마운트될 때도 진행분을 잃지 않게 커밋한다.
 */
function fmt(sec: number): string {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

export function todayStudyMin(studySec: Record<string, number>): number {
  return Math.round((studySec[todayId()] ?? 0) / 60)
}

export default function StudyTimer() {
  const addStudySec = useStore((s) => s.addStudySec)
  const studySec = useStore((s) => s.stats.studySec)
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0) // 이번 세션 초
  const startRef = useRef<number | null>(null)
  const tick = useRef<number | null>(null)

  // 흐른 만큼 스토어에 반영하고 세션을 리셋
  const commit = () => {
    if (startRef.current != null) {
      const sec = Math.round((Date.now() - startRef.current) / 1000)
      if (sec > 0) addStudySec(sec)
      startRef.current = null
    }
    setElapsed(0)
  }

  const startPause = () => {
    if (running) {
      commit()
      setRunning(false)
    } else {
      startRef.current = Date.now()
      setRunning(true)
    }
  }

  useEffect(() => {
    if (!running) return
    tick.current = window.setInterval(() => {
      if (startRef.current != null) setElapsed(Math.round((Date.now() - startRef.current) / 1000))
    }, 1000)
    return () => {
      if (tick.current) window.clearInterval(tick.current)
    }
  }, [running])

  // 언마운트 시 진행분 저장
  useEffect(() => {
    return () => {
      if (startRef.current != null) {
        const sec = Math.round((Date.now() - startRef.current) / 1000)
        if (sec > 0) addStudySec(sec)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const todayMin = todayStudyMin(studySec)

  return (
    <div className={`study-timer ${running ? 'on' : ''}`}>
      <div className="stt-left">
        <span className="stt-clock">{fmt(elapsed)}</span>
        <span className="stt-today">오늘 {todayMin}분 공부했어요</span>
      </div>
      <button className={`stt-btn ${running ? 'stop' : 'start'}`} onClick={startPause}>
        {running ? '⏸ 멈춤' : '▶ 공부 시작'}
      </button>
    </div>
  )
}
