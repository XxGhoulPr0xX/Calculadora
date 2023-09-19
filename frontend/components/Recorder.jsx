import React, { useRef, useState } from 'react'

export default function Recorder() {
    const [recording, setRecording] = useState(false)
    const [audioBlob, setAudioBlob] = useState(null)
    const [audioURL, setAudioURL] = useState('')
    const mediaRecorder = useRef(null)

    const handleStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

        mediaRecorder.current = new MediaRecorder(stream)

        const audioChunks = []

        mediaRecorder.current.ondataavailable = event => {
            audioChunks.push(event.data)
        }

        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks)
            const audioURL = URL.createObjectURL(audioBlob)
            setAudioBlob(audioBlob)
            setAudioURL(audioURL)
        }

        mediaRecorder.current.start()
        setRecording(true)

        setTimeout(() => {
            if (recording) handleStopRecording()
        }, 20000)
    }

    const handleStopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop()
            setRecording(false)
        }
    }

    return (
        <div className='p-4'>
            <button
                className={`p-2 m-2 bg-blue-500 text-white ${recording ? 'bg-red-500' : ''}`}
                onClick={recording ? handleStopRecording : handleStartRecording}>
                {recording ? 'Stop' : 'Rec'}
            </button>

            {audioBlob && (
                <div className='mt-4'>
                    <audio controls src={audioURL} />
                </div>
            )}
        </div>
    )
}
