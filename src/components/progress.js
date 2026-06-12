import React, { useState, useEffect } from "react"
import * as classes from "../styles/progress.module.sass"

const Progress = () => {
  const [completedQuizzes, setCompletedQuizzes] = useState(0)

  useEffect(() => {
    // Function to calculate completed quizzes from localStorage
    const calculateProgress = () => {
      let count = 0
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith("quiz_") && key.endsWith("_completed")) {
          if (localStorage.getItem(key) === "true") {
            count++
          }
        }
      }
      setCompletedQuizzes(count)
    }

    calculateProgress()

    // Listen to local storage changes from same window by custom event 
    // or from other tabs via 'storage' event
    window.addEventListener('storage', calculateProgress)
    window.addEventListener('quiz_completed', calculateProgress)

    return () => {
      window.removeEventListener('storage', calculateProgress)
      window.removeEventListener('quiz_completed', calculateProgress)
    }
  }, [])

  if (completedQuizzes === 0) return null; // Don't show if 0

  return (
    <div className={classes.progressContainer}>
      <span className={classes.icon}>🏆</span>
      <span className={classes.text}>
        Skor Belajar: <strong>{completedQuizzes}</strong> Kuis Selesai
      </span>
    </div>
  )
}

export default Progress
